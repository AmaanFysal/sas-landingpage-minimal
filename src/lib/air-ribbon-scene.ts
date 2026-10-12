// Live version of the "air ribbon" render (scripts/air-ribbon/render.html):
// same shape, angle, lighting, satin metal and grain, plus a slow liquid
// ripple. Loaded on demand by <LiquidRibbon>; the static image is shown until
// the first frame is drawn.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Must match the parameters of public/art/air-ribbon-loop.webp (see README).
const SKY = new THREE.Color("#3cc4ff");
const NAVY = new THREE.Color("#00202e");
const PEARL = new THREE.Color("#eaf6ff");
const ROTATION = new THREE.Euler(-0.6, -0.5, 2.2);

// The static image is the 3000px render trimmed to (170, 450, 2300 × 2374).
// The canvas shows that window plus PAD on every side so moving edges never
// clip; the component positions the canvas with the same margin.
export const PAD = 0.06;
const FRAME = 3000;
const IMG = { x: 170, y: 450, w: 2300, h: 2374 };

const LOOP_SECONDS = 12; // one full ripple cycle
const FPS = 30;
const MAX_PIXELS = 2_400_000; // device-pixel budget per canvas (keeps retina sharp, caps GPU cost)
const NU = 480; // segments along the ribbon
const NV = 40; // segments around the profile

export type RibbonScene = {
  start: () => void;
  stop: () => void;
  dispose: () => void;
  onFirstFrame: (cb: () => void) => void;
};

function grainTexture(size = 1024) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 150 + Math.random() * 105;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(14, 2);
  t.anisotropy = 8;
  return t;
}

// Ribbon centre line and profile. Every ripple term is (f(u, t) − f(u, 0)),
// so frame 0 is exactly the static render and the loop is seamless.
const ripple = (u: number, t: number, k: number, phase: number) =>
  Math.sin(k * u - t + phase) - Math.sin(k * u + phase);

function ribbonAt(u: number, t: number) {
  const R = 1.0;
  const r = R + 0.18 * Math.sin(3 * u) + 0.03 * ripple(u, t, 3, 0);
  const z = 0.32 * Math.sin(2 * u) + 0.035 * ripple(u, t, 2, 1.3);
  return { x: r * Math.cos(u), y: r * Math.sin(u), z };
}
const twistAt = (u: number, t: number) => 1.5 * u + 0.12 * ripple(u, t, 2, 0.7);
const widthAt = (u: number, t: number) => 0.3 + 0.06 * Math.cos(2 * u) + 0.012 * ripple(u, t, 2, 2.1);
const THICK = 0.055;

function colourAt(u: number) {
  const k = 0.5 + 0.5 * Math.cos(u + 0.6); // 1 = sky, 0 = navy
  const s = THREE.MathUtils.smoothstep(k, 0.15, 0.85);
  return NAVY.clone().lerp(SKY, s);
}

function buildGeometry() {
  const count = (NU + 1) * (NV + 1);
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const uv = new Float32Array(count * 2);
  const idx: number[] = [];
  for (let i = 0; i <= NU; i++) {
    const u = (i / NU) * Math.PI * 2;
    const c = colourAt(u);
    for (let j = 0; j <= NV; j++) {
      const v = (j / NV) * Math.PI * 2;
      const edge = Math.abs(Math.cos(v));
      const cc = c.clone().lerp(PEARL, 0.12 * edge * edge);
      const n = i * (NV + 1) + j;
      col.set([cc.r, cc.g, cc.b], n * 3);
      uv.set([i / NU, j / NV], n * 2);
    }
  }
  for (let i = 0; i < NU; i++)
    for (let j = 0; j < NV; j++) {
      const a = i * (NV + 1) + j;
      const b = (i + 1) * (NV + 1) + j;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

// Rounded-rectangle profile swept along the centre line (same as the script).
function updateGeometry(g: THREE.BufferGeometry, t: number) {
  const pos = g.getAttribute("position") as THREE.BufferAttribute;
  const arr = pos.array as Float32Array;
  const up = new THREE.Vector3(0, 0, 1);
  const T = new THREE.Vector3();
  const N = new THREE.Vector3();
  const B = new THREE.Vector3();
  const se = (a: number, n: number) => Math.sign(a) * Math.pow(Math.abs(a), n);
  for (let i = 0; i <= NU; i++) {
    const u = (i / NU) * Math.PI * 2;
    const p = ribbonAt(u, t);
    const p2 = ribbonAt(u + 1e-3, t);
    T.set(p2.x - p.x, p2.y - p.y, p2.z - p.z).normalize();
    N.copy(up).addScaledVector(T, -up.dot(T)).normalize();
    B.crossVectors(T, N).normalize();
    const ang = twistAt(u, t);
    const ca = Math.cos(ang);
    const sa = Math.sin(ang);
    const w = widthAt(u, t);
    for (let j = 0; j <= NV; j++) {
      const v = (j / NV) * Math.PI * 2;
      const x = se(Math.cos(v), 0.35) * w;
      const y = se(Math.sin(v), 0.35) * THICK;
      const xr = x * ca - y * sa;
      const yr = x * sa + y * ca;
      const n = (i * (NV + 1) + j) * 3;
      arr[n] = p.x + N.x * xr + B.x * yr;
      arr[n + 1] = p.y + N.y * xr + B.y * yr;
      arr[n + 2] = p.z + N.z * xr + B.z * yr;
    }
  }
  pos.needsUpdate = true;
  g.computeVertexNormals();
}

export function createRibbonScene(canvas: HTMLCanvasElement): RibbonScene | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    return null; // no WebGL: the static image stays
  }
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
  scene.environment = envMap;
  scene.environmentIntensity = 1.3;

  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(-3, 5, 4);
  const rim = new THREE.DirectionalLight(0xffffff, 0.8);
  rim.position.set(4, -2, -3);
  scene.add(key, rim);

  const grain = grainTexture();
  const material = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    metalness: 0.75,
    roughness: 0.32,
    roughnessMap: grain,
    bumpMap: grain,
    bumpScale: 0.9,
    sheen: 0.35,
    sheenRoughness: 0.8,
    sheenColor: new THREE.Color("#d6efff"),
    side: THREE.DoubleSide,
  });
  // Film grain on the object only (the static image gets it in post).
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `#include <dithering_fragment>
      vec2 gcell = floor(gl_FragCoord.xy / 2.0);
      float gn = fract(sin(dot(gcell, vec2(12.9898, 78.233))) * 43758.5453)
               + fract(sin(dot(gcell, vec2(39.3468, 11.135))) * 24634.6345) - 1.0;
      gl_FragColor.rgb = clamp(gl_FragColor.rgb + gn * 0.075, 0.0, 1.0);`,
    );
  };

  const geometry = buildGeometry();
  updateGeometry(geometry, 0);
  const mesh = new THREE.Mesh(geometry, material);
  const group = new THREE.Group();
  group.rotation.copy(ROTATION);
  group.add(mesh);
  scene.add(group);

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0, 6.4);
  camera.lookAt(0, 0, 0);
  const padX = IMG.w * PAD;
  const padY = IMG.h * PAD;
  camera.setViewOffset(FRAME, FRAME, IMG.x - padX, IMG.y - padY, IMG.w + 2 * padX, IMG.h + 2 * padY);

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / (w * h))));
    renderer.setSize(w, h, false);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let raf = 0;
  let running = false;
  let last = 0;
  let elapsed = 0;
  let firstFrameCb: (() => void) | null = null;
  let drewFirst = false;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (now - last < 1000 / FPS - 1) return;
    elapsed += last ? Math.min(now - last, 100) / 1000 : 0;
    last = now;
    const t = (elapsed / LOOP_SECONDS) * Math.PI * 2;
    updateGeometry(geometry, t);
    group.rotation.z = ROTATION.z + 0.035 * Math.sin(t);
    renderer.render(scene, camera);
    if (!drewFirst) {
      drewFirst = true;
      firstFrameCb?.();
    }
  };

  const onVisibility = () => (document.hidden ? stop() : running && start());
  function start() {
    running = true;
    if (raf || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    if (!document.hidden) running = false;
    cancelAnimationFrame(raf);
    raf = 0;
  }
  document.addEventListener("visibilitychange", onVisibility);

  return {
    start,
    stop,
    onFirstFrame: (cb) => {
      firstFrameCb = cb;
      if (drewFirst) cb();
    },
    dispose: () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      grain.dispose();
      envMap.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}

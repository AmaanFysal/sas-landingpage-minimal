// Tiny local server: serves render.html and saves POSTed PNG data URLs to OUT_DIR.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const [, , outDir, port = "4319"] = process.argv;
const here = path.dirname(new URL(import.meta.url).pathname);
fs.mkdirSync(outDir, { recursive: true });
http
  .createServer((req, res) => {
    const url = new URL(req.url, "http://x");
    if (req.method === "POST" && url.pathname === "/save") {
      const name = (url.searchParams.get("name") || "out").replace(/[^a-z0-9-]/gi, "");
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        const b64 = body.replace(/^data:image\/png;base64,/, "");
        const file = path.join(outDir, `${name}.png`);
        fs.writeFileSync(file, Buffer.from(b64, "base64"));
        res.end(`saved ${file} ${fs.statSync(file).size}`);
      });
      return;
    }
    const f = path.join(here, url.pathname === "/" ? "render.html" : url.pathname);
    if (!f.startsWith(here) || !fs.existsSync(f)) { res.statusCode = 404; return res.end("nf"); }
    res.setHeader("content-type", f.endsWith(".html") ? "text/html" : "text/javascript");
    res.end(fs.readFileSync(f));
  })
  .listen(Number(port), () => console.log("listening", port));

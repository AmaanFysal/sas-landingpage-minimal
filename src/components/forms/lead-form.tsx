"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { sendLead } from "@/app/actions/send-lead";
import { contactEmail, formFields, formText } from "@/content/site";
import { LEAD_STEPS, validateFields, type FieldSpec, type LeadErrors, type LeadKind, type LeadState, type LeadValues } from "@/lib/lead";

type Copy = {
  titleLines: readonly string[];
  next: string;
  submit: string;
  done: { title: string; body: string };
};
type Variant = "modal" | "page";

/*
 * Two-step lead form, sized from fin.ai's live pages (measured 12 Oct 2026):
 * - "modal" = /view-demos gate: 620px white card, clay corner dots inset 16px,
 *   14px "Back", 40px two-tone heading (first line 60%), 14px labels, 40px
 *   off-white inputs with a 20% border, 40px button, 4px progress bar.
 * - "page" = /contact-sales: 472px column, 36px light heading, 11px spaced
 *   capitals for labels, 52px cream inputs (48px select) with a grey border,
 *   48px black button (r6), consent checkbox under the button.
 * Step 1 is checked in the browser; the last step sends everything to the
 * `sendLead` server action, which validates again and emails it via Resend.
 */
export function LeadForm({ kind, copy, variant }: { kind: LeadKind; copy: Copy; variant: Variant }) {
  const steps = LEAD_STEPS[kind];
  const last = steps.length - 1;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<LeadValues>({});
  const [errors, setErrors] = useState<LeadErrors>({});
  const action = useMemo(() => sendLead.bind(null, kind), [kind]);
  const [state, dispatch, pending] = useActionState(action, { status: "idle" } as LeadState);
  const submissionId = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const moved = useRef(false);
  const modal = variant === "modal";
  const done = state.status === "sent";
  const shownErrors = { ...state.errors, ...errors };

  // Move focus to the first field whenever the step changes (not on load).
  useEffect(() => {
    if (!moved.current) return;
    formRef.current?.querySelector<HTMLElement>("input:not([type=hidden]):not([tabindex='-1']), select, textarea")?.focus();
  }, [step]);

  const goTo = (next: number) => {
    moved.current = true;
    setErrors({});
    setStep(next);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateFields(steps[step], values);
    setErrors(found);
    const firstInvalid = steps[step].find((field) => found[field.name]);
    if (firstInvalid) {
      (event.currentTarget.elements.namedItem(firstInvalid.name) as HTMLElement | null)?.focus();
      return;
    }
    if (step < last) return goTo(step + 1);
    const data = new FormData(event.currentTarget);
    submissionId.current ??= crypto.randomUUID();
    data.set("submissionId", submissionId.current);
    startTransition(() => dispatch(data));
  };

  const set = (name: FieldSpec["name"], value: string) => setValues((v) => ({ ...v, [name]: value }));
  // The modal keeps the consent checkbox with the fields; the page puts it under the button.
  const fields = modal ? steps[step] : steps[step].filter((f) => f.type !== "checkbox");
  const after = modal ? [] : steps[step].filter((f) => f.type === "checkbox");
  const field = (f: FieldSpec) => (
    <Field key={f.name} field={f} value={values[f.name] ?? ""} error={shownErrors[f.name]} onChange={set} variant={variant} />
  );

  const failed = state.failed && (
    <p role="alert" className="text-[14px]/[1.4] text-error">
      {formText.failed.split("{email}")[0]}
      <a href={`mailto:${contactEmail}`} className="underline underline-offset-2">
        {contactEmail}
      </a>
      {formText.failed.split("{email}")[1]}
    </p>
  );

  const form = (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={modal ? "flex min-h-[240px] w-full flex-col gap-6" : "flex w-full flex-col"}>
      <div className={modal ? "flex flex-col gap-3" : "flex flex-col gap-6"}>{fields.map(field)}</div>

      {/* Values from the other step travel with the final submit. */}
      {steps
        .filter((_, i) => i !== step)
        .flat()
        .map((f) => (
          <input key={f.name} type="hidden" name={f.name} value={values[f.name] ?? ""} />
        ))}
      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />

      <button
        type="submit"
        disabled={pending}
        className={
          modal
            ? "mt-auto inline-flex h-10 w-full items-center justify-center rounded-[4px] bg-off-black px-3.5 text-base text-white transition-colors hover:bg-sky-ink disabled:opacity-60"
            : "mt-6 h-12 w-full rounded-[6px] bg-ink text-base tracking-[-0.02em] text-white transition-colors hover:bg-sky-ink disabled:opacity-60"
        }
      >
        {pending ? formText.sending : step < last ? copy.next : copy.submit}
      </button>
      {after.length > 0 && <div className="mt-6">{after.map(field)}</div>}
      {failed && <div className={modal ? "" : "mt-4"}>{failed}</div>}
    </form>
  );

  const doneBody = (
    <p role="status" className={`text-center ${modal ? "text-base text-off-black/70" : "t-body-lg"}`}>
      {copy.done.body}
    </p>
  );

  if (!modal) {
    return (
      <div className="w-full max-w-[472px]">
        {step > 0 && !done && (
          <button type="button" onClick={() => goTo(step - 1)} className="mb-6 text-[14px]/[1.1] underline underline-offset-[3px]">
            {formText.back}
          </button>
        )}
        <h1 className="pb-8 text-[30px]/[36px] font-light tracking-[-0.03em] md:pb-10 md:text-center lg:pb-12 lg:text-[36px]/[40px]">
          {done ? (
            copy.done.title
          ) : (
            <>
              {copy.titleLines[0]}
              <br />
              {copy.titleLines[1]}
            </>
          )}
        </h1>
        {done ? doneBody : form}
      </div>
    );
  }

  const progress = done ? 1 : (step + 1) / (steps.length + 1);
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="lead-title" className="relative m-auto flex w-full max-w-[620px] flex-col overflow-hidden bg-white text-off-black">
      <div aria-hidden className="pointer-events-none absolute inset-0 m-4 text-clay">
        <span className="absolute left-0 top-0 size-2 bg-current" />
        <span className="absolute right-0 top-0 size-2 bg-current" />
        <span className="absolute bottom-0 left-0 size-2 bg-current" />
        <span className="absolute bottom-0 right-0 size-2 bg-current" />
      </div>
      {step > 0 && !done ? (
        <button type="button" onClick={() => goTo(step - 1)} className={backClass}>
          {formText.back}
        </button>
      ) : (
        <Link href="/" className={backClass}>
          {formText.back}
        </Link>
      )}
      <div className="flex flex-col gap-8 px-6 py-15 md:gap-12 md:p-12">
        <h1 id="lead-title" className="mx-auto max-w-[11em] text-center text-[40px]/[38px] font-normal tracking-[-1.2px] md:leading-[40px]">
          {done ? (
            copy.done.title
          ) : (
            <>
              <span className="text-current/60">{copy.titleLines[0]}</span>
              <br />
              {copy.titleLines[1]}
            </>
          )}
        </h1>
        {done ? doneBody : form}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-off-black/20" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
        <div className="h-full bg-sky transition-[width] duration-300 ease-out" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

const backClass = "absolute left-6 top-8 z-10 text-[14px]/[1.1] underline underline-offset-[3px] md:left-8 md:top-6";

function Field({
  field,
  value,
  error,
  onChange,
  variant,
}: {
  field: FieldSpec;
  value: string;
  error?: string;
  onChange: (name: FieldSpec["name"], value: string) => void;
  variant: Variant;
}) {
  const modal = variant === "modal";
  const copy = formFields[field.name];
  const id = `lead-${field.name}`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);
  const described = invalid ? errorId : undefined;
  const placeholder = "placeholder" in copy ? copy.placeholder : undefined;
  // Fin's two field styles: modal = off-white, 20% border; page = cream, grey border.
  const control = modal
    ? `w-full rounded-[2px] border bg-page px-3 text-base text-off-black outline-none transition-colors placeholder:text-muted focus:border-off-black ${invalid ? "border-error" : "border-off-black/20"}`
    : `w-full rounded-[4px] border bg-cream px-4 text-[18px] text-ink outline-none transition-colors placeholder:text-muted hover:border-ink focus:border-ink ${invalid ? "border-error" : "border-field-line"}`;

  if (field.type === "checkbox") {
    return (
      <label className={`flex cursor-pointer items-start gap-2.5 ${modal ? "text-[14px]/[1.4]" : "text-base/[1.375] xl:text-[18px]/[1.33]"}`}>
        <span className="relative mt-[3px] grid size-[18px] shrink-0 place-items-center">
          <input
            type="checkbox"
            name={field.name}
            checked={value === "on"}
            onChange={(e) => onChange(field.name, e.target.checked ? "on" : "")}
            className={`peer size-[18px] cursor-pointer appearance-none rounded-[2px] border checked:border-ink checked:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-ink ${
              modal ? "border-off-black/20 bg-page" : "border-field-line bg-cream"
            }`}
          />
          <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute hidden size-3 text-white peer-checked:block" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8.5l3.2 3L13 4.5" />
          </svg>
        </span>
        {copy.label}
      </label>
    );
  }

  return (
    <div>
      <label
        htmlFor={id}
        className={modal ? "block pb-1.5 text-[14px]/[1.4]" : "mb-2 block text-[11px]/[1.273] uppercase tracking-[0.094rem]"}
      >
        {copy.label}
        {field.required && " *"}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          value={value}
          maxLength={field.maxLength}
          rows={3}
          placeholder={placeholder}
          aria-invalid={invalid}
          aria-describedby={described}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${control} block min-h-[88px] resize-y py-2`}
        />
      ) : field.type === "select" ? (
        <div className="relative">
          <select
            id={id}
            name={field.name}
            value={value}
            required={field.required}
            aria-invalid={invalid}
            aria-describedby={described}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={`${control} ${modal ? "h-10" : "h-12"} cursor-pointer appearance-none pr-12 ${value ? "" : "text-muted"}`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {"options" in copy &&
              copy.options.map((option) => (
                <option key={option} value={option} className="text-ink">
                  {option}
                </option>
              ))}
          </select>
          <svg aria-hidden viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 w-3 -translate-y-1/2 fill-ink">
            <path d="M0 0h12L6 8z" />
          </svg>
        </div>
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          value={value}
          maxLength={field.maxLength}
          autoComplete={field.autoComplete}
          required={field.required}
          placeholder={placeholder}
          aria-invalid={invalid}
          aria-describedby={described}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${control} ${modal ? "h-10" : "h-[52px]"}`}
        />
      )}
      {invalid && (
        <p id={errorId} className="mt-1.5 text-[13px]/[1.4] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

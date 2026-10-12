"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { sendLead } from "@/app/actions/send-lead";
import { CornerMarks } from "@/components/landing/marks";
import { contactEmail, formFields, formText } from "@/content/site";
import { LEAD_STEPS, validateFields, type FieldSpec, type LeadErrors, type LeadKind, type LeadState, type LeadValues } from "@/lib/lead";

type Copy = {
  titleLines: readonly string[];
  next: string;
  submit: string;
  done: { title: string; body: string };
};

/**
 * Two-step lead form after fin.ai's step forms (design library F-02, F-03).
 * - "modal": white card with inset corner squares, a "Back" link, two-tone
 *   heading and a thin progress bar along the bottom (/view-demos).
 * - "page": plain centred column with small caps labels (Fin's demo form).
 * Step 1 is checked in the browser; the last step sends everything to the
 * `sendLead` server action, which validates again and emails it via Resend.
 */
export function LeadForm({ kind, copy, variant }: { kind: LeadKind; copy: Copy; variant: "modal" | "page" }) {
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
  const progress = done ? 1 : (step + 1) / (steps.length + 1);
  // Fin's light form puts the consent checkbox under the button; the modal keeps it above.
  const fields = modal ? steps[step] : steps[step].filter((f) => f.type !== "checkbox");
  const after = modal ? [] : steps[step].filter((f) => f.type === "checkbox");

  const heading = (
    <h1 className={`text-center font-light tracking-[-0.035em] ${modal ? "text-[34px]/[1.05] md:text-[48px]" : "text-[34px]/[1.08] md:text-[40px]"}`}>
      {done ? (
        copy.done.title
      ) : (
        <>
          <span className={`block text-balance ${modal ? "text-ink/40" : ""}`}>{copy.titleLines[0]}</span>
          <span className="block text-balance">{copy.titleLines[1]}</span>
        </>
      )}
    </h1>
  );

  const back =
    step > 0 && !done ? (
      <button type="button" onClick={() => goTo(step - 1)} className={backClass}>
        {formText.back}
      </button>
    ) : modal ? (
      <Link href="/" className={backClass}>
        {formText.back}
      </Link>
    ) : null;

  const body = (
    <>
      {back && <div className={modal ? "" : "mb-6"}>{back}</div>}
      <div className={modal ? "mt-4 md:mt-2" : ""}>{heading}</div>

      {done ? (
        <p role="status" className="t-body-lg mx-auto mt-6 max-w-[460px] text-center">
          {copy.done.body}
        </p>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} noValidate className={`mx-auto w-full ${modal ? "mt-10 md:mt-12" : "mt-10 max-w-[472px]"}`}>
          <div className="space-y-6">
            {fields.map((field) => (
              <Field key={field.name} field={field} value={values[field.name] ?? ""} error={shownErrors[field.name]} onChange={set} variant={variant} />
            ))}
          </div>

          {/* Values from the other step travel with the final submit. */}
          {steps
            .filter((_, i) => i !== step)
            .flat()
            .map((field) => (
              <input key={field.name} type="hidden" name={field.name} value={values[field.name] ?? ""} />
            ))}
          {/* Honeypot for bots; hidden from people and assistive tech. */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />

          <button
            type="submit"
            disabled={pending}
            className={`mt-8 w-full bg-off-black text-white transition-colors hover:bg-sky-ink disabled:opacity-60 ${
              modal ? "h-[52px] rounded-[2px] text-[18px]" : "h-12 rounded-[4px] text-base"
            }`}
          >
            {pending ? formText.sending : step < last ? copy.next : copy.submit}
          </button>

          {after.length > 0 && (
            <div className="mt-6">
              {after.map((field) => (
                <Field key={field.name} field={field} value={values[field.name] ?? ""} onChange={set} variant={variant} />
              ))}
            </div>
          )}

          {state.failed && (
            <p role="alert" className="mt-4 text-[15px]/[1.4] text-error">
              {formText.failed.split("{email}")[0]}
              <a href={`mailto:${contactEmail}`} className="underline underline-offset-2">
                {contactEmail}
              </a>
              {formText.failed.split("{email}")[1]}
            </p>
          )}
        </form>
      )}
    </>
  );

  if (!modal) return <div className="w-full max-w-[600px]">{body}</div>;

  return (
    <div className="relative w-full max-w-[820px] bg-sheet px-6 pb-14 pt-8 text-ink md:px-16 md:pb-16 md:pt-10">
      <div aria-hidden className="pointer-events-none absolute inset-4 md:inset-6">
        <CornerMarks className="bg-ink/15" />
      </div>
      <div className="relative">{body}</div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        className="absolute inset-x-0 bottom-0 h-[5px] bg-ink/10"
      >
        <div className="h-full bg-sky transition-[width] duration-500 ease-out" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

const backClass = "text-[17px] underline underline-offset-[3px] decoration-ink/40 hover:decoration-ink";

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
  variant: "modal" | "page";
}) {
  const copy = formFields[field.name];
  const id = `lead-${field.name}`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);
  const described = invalid ? errorId : undefined;
  const control = `w-full rounded-[2px] border bg-chalk px-4 text-[18px] text-ink outline-none transition-colors placeholder:text-ink/45 focus:border-ink ${
    invalid ? "border-error" : "border-ink/40"
  }`;

  if (field.type === "checkbox") {
    return (
      <label className="flex cursor-pointer items-start gap-3 text-[17px]/[1.4] text-ink/90">
        <span className="relative mt-0.5 grid size-6 shrink-0 place-items-center">
          <input
            type="checkbox"
            name={field.name}
            checked={value === "on"}
            onChange={(e) => onChange(field.name, e.target.checked ? "on" : "")}
            className="peer size-6 cursor-pointer appearance-none rounded-[2px] border border-ink/40 bg-chalk checked:border-off-black checked:bg-off-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-ink"
          />
          <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute hidden size-3.5 text-white peer-checked:block" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8.5l3.2 3L13 4.5" />
          </svg>
        </span>
        {copy.label}
      </label>
    );
  }

  const placeholder = "placeholder" in copy ? copy.placeholder : undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-2 block ${variant === "modal" ? "text-[17px]/[1.4] text-ink" : "text-[12px]/[1.4] uppercase tracking-[0.12em] text-ink"}`}
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
          rows={4}
          placeholder={placeholder}
          aria-invalid={invalid}
          aria-describedby={described}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${control} block min-h-[120px] resize-y py-3`}
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
            className={`${control} h-[52px] cursor-pointer appearance-none pr-12 ${value ? "" : "text-ink/45"}`}
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
          <svg aria-hidden viewBox="0 0 12 8" className="pointer-events-none absolute right-5 top-1/2 w-3 -translate-y-1/2 fill-ink">
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
          className={`${control} h-[52px]`}
        />
      )}
      {invalid && (
        <p id={errorId} className="mt-2 text-[14px]/[1.4] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

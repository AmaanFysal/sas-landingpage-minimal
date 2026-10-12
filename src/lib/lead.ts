// Contact and waitlist forms: which fields each step asks for, and the
// validation shared by the browser (to move between steps) and the server
// action (which checks everything again before emailing it).
import { formFields, formText } from "@/content/site";

export type LeadKind = "contact" | "waitlist";
export type FieldName = keyof typeof formFields;
export type LeadValues = Partial<Record<FieldName, string>>;
export type LeadErrors = Partial<Record<FieldName, string>>;

export type FieldSpec = {
  name: FieldName;
  type: "email" | "text" | "tel" | "textarea" | "select" | "checkbox";
  required?: boolean;
  autoComplete?: string;
  maxLength: number;
};

const email: FieldSpec = { name: "email", type: "email", required: true, autoComplete: "email", maxLength: 254 };
const name: FieldSpec = { name: "name", type: "text", required: true, autoComplete: "name", maxLength: 120 };
const organisation: FieldSpec = { name: "organisation", type: "text", required: true, autoComplete: "organization", maxLength: 160 };
const updates: FieldSpec = { name: "updates", type: "checkbox", maxLength: 3 };

/** Two steps each, like Fin's step forms. */
export const LEAD_STEPS: Record<LeadKind, FieldSpec[][]> = {
  contact: [
    [email, updates],
    [
      name,
      organisation,
      { name: "phone", type: "tel", autoComplete: "tel", maxLength: 40 },
      { name: "message", type: "textarea", maxLength: 4000 },
    ],
  ],
  waitlist: [
    [email, { name: "homes", type: "select", required: true, maxLength: 10 }, updates],
    [name, organisation, { name: "role", type: "text", autoComplete: "organization-title", maxLength: 120 }],
  ],
};

export type LeadState = {
  status: "idle" | "sent" | "error";
  errors?: LeadErrors;
  /** Sending failed after validation (e.g. the email service is unavailable). */
  failed?: boolean;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HOMES: readonly string[] = formFields.homes.options;

export function validateFields(fields: FieldSpec[], values: LeadValues): LeadErrors {
  const errors: LeadErrors = {};
  for (const field of fields) {
    const value = (values[field.name] ?? "").trim();
    if (field.required && !value) errors[field.name] = formText.required;
    else if (value.length > field.maxLength) errors[field.name] = formText.required;
    else if (field.type === "email" && value && !EMAIL.test(value)) errors[field.name] = formText.invalidEmail;
    else if (field.type === "select" && value && !HOMES.includes(value)) errors[field.name] = formText.required;
  }
  return errors;
}

"use server";

import { Resend } from "resend";
import { contactEmail, formFields } from "@/content/site";
import { LEAD_STEPS, validateFields, type LeadKind, type LeadState, type LeadValues } from "@/lib/lead";

const SUBMISSION_ID = /^[0-9a-f-]{36}$/i;

/** FNV-1a, so an edited resubmission gets a new idempotency key. */
function hash(text: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 0x01000193);
  return (h >>> 0).toString(16);
}

const oneLine = (text: string) => text.replace(/\s+/g, " ").trim().slice(0, 160);

/**
 * Emails a contact request or waitlist sign-up to the SAS inbox via Resend
 * (provisioned through the Vercel Marketplace: RESEND_API_KEY and
 * RESEND_EMAIL_DOMAIN). Public entry point: everything is validated again here.
 */
export async function sendLead(kind: LeadKind, _prev: LeadState, formData: FormData): Promise<LeadState> {
  if (kind !== "contact" && kind !== "waitlist") return { status: "error", failed: true };

  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website") ?? "")) return { status: "sent" };

  const fields = LEAD_STEPS[kind].flat();
  const values: LeadValues = {};
  for (const field of fields) values[field.name] = String(formData.get(field.name) ?? "").trim();
  const errors = validateFields(fields, values);
  if (Object.keys(errors).length) return { status: "error", errors };

  const id = String(formData.get("submissionId") ?? "");
  const apiKey = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!SUBMISSION_ID.test(id) || !apiKey || !domain) {
    if (!apiKey || !domain) console.error("[sendLead] RESEND_API_KEY or RESEND_EMAIL_DOMAIN is not set");
    return { status: "error", failed: true };
  }

  const rows = fields.map((field) => {
    const value = values[field.name];
    if (field.type === "checkbox") return `Updates: ${value ? "Yes" : "No"}`;
    return `${formFields[field.name].label}: ${value || "-"}`;
  });
  const heading = kind === "contact" ? "New contact request from the website" : "New waitlist sign-up from the website";
  const text = [heading, "", ...rows, "", `Reply to this email to answer ${values.name}.`].join("\n");
  const subject =
    kind === "contact"
      ? oneLine(`Contact request: ${values.name}, ${values.organisation}`)
      : oneLine(`Waitlist: ${values.organisation} (${values.homes} care homes)`);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send(
    {
      from: `SAS website <forms@${domain}>`,
      to: [contactEmail],
      replyTo: values.email,
      subject,
      text,
    },
    { idempotencyKey: `${kind}-form/${id}/${hash(text)}` },
  );
  if (error) {
    console.error("[sendLead] Resend error:", error.name, error.message);
    return { status: "error", failed: true };
  }
  return { status: "sent" };
}

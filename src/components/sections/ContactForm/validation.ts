/** Contact form rules. Messages are short and in simple English. */

export const purposes = [
  { value: "hire", label: "Hire workers", hint: "For companies" },
  { value: "job", label: "Find a job abroad", hint: "For job seekers" },
  { value: "other", label: "Something else", hint: "Any other question" },
] as const;
export type Purpose = (typeof purposes)[number]["value"];

export const countries = ["Saudi Arabia", "UAE", "Kuwait", "Qatar", "Oman", "Bahrain", "Malaysia", "Other"];

export type Values = {
  purpose: Purpose | "";
  name: string;
  phone: string;
  email: string;
  company: string;
  workers: string;
  work: string;
  country: string;
  message: string;
};
export type Field = keyof Values;
export type Errors = Partial<Record<Field, string>>;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 1000;

export const emptyValues: Values = {
  purpose: "",
  name: "",
  phone: "",
  email: "",
  company: "",
  workers: "",
  work: "",
  country: "",
  message: "",
};

/** Fields the visitor must fill, which depend on what they want to do. */
export function requiredFields(purpose: Values["purpose"]): Field[] {
  const base: Field[] = ["purpose", "name", "phone", "message"];
  if (purpose === "hire") return [...base, "company", "workers", "country"];
  if (purpose === "job") return [...base, "work", "country"];
  return base;
}

const NAME = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function checkPhone(raw: string): string | undefined {
  const value = raw.trim();
  if (!value) return "Please write your phone number.";
  if (!/^\+?[\d\s()-]+$/.test(value)) return "Use numbers only, for example 98XXXXXXXX.";
  let digits = value.replace(/\D/g, "");
  const international = value.startsWith("+") || digits.startsWith("00");
  if (digits.startsWith("00")) digits = digits.slice(2);
  // Nepali mobile numbers are 10 digits starting 96/97/98. Check that only for numbers
  // written without a country code, or with +977. Other countries (e.g. +966) are left alone.
  const nepaliLocal = !international ? digits.replace(/^977/, "") : digits.startsWith("977") ? digits.slice(3) : null;
  if (nepaliLocal && /^9[678]/.test(nepaliLocal) && nepaliLocal.length !== 10)
    return "A Nepali mobile number has 10 digits, for example 98XXXXXXXX.";
  if (digits.length < 7 || digits.length > 15) return "This phone number does not look right.";
  return undefined;
}

/** Returns an error message for one field, or undefined when it is fine. */
export function validateField(field: Field, v: Values): string | undefined {
  const value = v[field].trim();
  const required = requiredFields(v.purpose).includes(field);
  if (field === "phone") return checkPhone(v.phone);
  if (!value) return required ? emptyMessage[field] : undefined;

  switch (field) {
    case "name":
      if (value.length < 2) return "Please write your full name.";
      if (value.length > 60) return "Your name is too long.";
      if (!NAME.test(value)) return "Please use letters only.";
      return;
    case "email":
      return EMAIL.test(value) ? undefined : "This email does not look right, for example name@gmail.com.";
    case "company":
      return value.length < 2 ? "Please write your company name." : undefined;
    case "workers": {
      const n = Number(value);
      if (!Number.isInteger(n) || n < 1) return "Please write a number, for example 10.";
      if (n > 5000) return "Please write a number up to 5000. For more, call us.";
      return;
    }
    case "work":
      return value.length < 2 ? "Please write the work you do." : undefined;
    case "message":
      if (value.length < MESSAGE_MIN) return `Please write a little more (at least ${MESSAGE_MIN} letters).`;
      if (value.length > MESSAGE_MAX) return `Please keep it under ${MESSAGE_MAX} letters.`;
      return;
    default:
      return;
  }
}

const emptyMessage: Record<Field, string> = {
  purpose: "Please choose one.",
  name: "Please write your name.",
  phone: "Please write your phone number.",
  email: "",
  company: "Please write your company name.",
  workers: "Please write how many workers you need.",
  work: "Please write the work you do.",
  country: "Please choose a country.",
  message: "Please write a short message.",
};

export function validateAll(v: Values): Errors {
  const errors: Errors = {};
  const fields: Field[] = ["purpose", "name", "phone", "email", "company", "workers", "work", "country", "message"];
  for (const f of fields) {
    if (!requiredFields(v.purpose).includes(f) && f !== "email") continue;
    const e = validateField(f, v);
    if (e) errors[f] = e;
  }
  return errors;
}

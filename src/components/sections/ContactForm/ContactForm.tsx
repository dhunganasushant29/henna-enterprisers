"use client";

import { useId, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Globe2,
  Hammer,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  User,
  Users,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import {
  countries,
  emptyValues,
  MESSAGE_MAX,
  purposes,
  requiredFields,
  validateAll,
  validateField,
  type Errors,
  type Field,
  type Purpose,
  type Values,
} from "./validation";
import { useSendChannel, type Channel } from "./useSendChannel";
import styles from "./ContactForm.module.css";

/**
 * Contact form with live validation.
 * Visitors choose how to send: by email (through EmailJS, https://www.emailjs.com) or on WhatsApp
 * (opens WhatsApp with the message already written to Henna's number).
 * The three keys come from the EmailJS dashboard and live in .env.local (see .env.example).
 */
const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const messageHints: Record<Values["purpose"], string> = {
  hire: "Tell us about the jobs, for example: 20 masons and 10 helpers for a building project.",
  job: "Tell us about your experience, for example: I worked as a cook for 3 years.",
  other: "How can we help you?",
  "": "How can we help you?",
};

/** Plain-text summary of the whole message, sent as {{summary}} in the email. */
function summary(v: Values) {
  const purpose = purposes.find((p) => p.value === v.purpose)?.label ?? "";
  const details = [
    `I want to: ${purpose}`,
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    v.email.trim() ? `Email: ${v.email.trim()}` : null,
    v.purpose === "hire" ? `Company: ${v.company.trim()}` : null,
    v.purpose === "hire" ? `Workers needed: ${v.workers.trim()}` : null,
    v.purpose === "job" ? `My work: ${v.work.trim()}` : null,
    v.purpose === "hire" || v.purpose === "job" ? `Country: ${v.country}` : null,
  ].filter(Boolean);
  return ["Hello Henna Enterprises,", details.join("\n"), v.message.trim()].join("\n\n");
}

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(emptyValues);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [channel, setChannel] = useSendChannel();
  const [sentVia, setSentVia] = useState<Channel>("email");
  /** Switching method clears an old "did not send" error, since it no longer applies. */
  const chooseChannel = (next: Channel) => {
    setChannel(next);
    if (status === "failed") setStatus("idle");
  };

  // Errors are worked out from the current values on every render, so they can never go stale.
  // Before the first submit, only fields the visitor has already left are shown.
  const allErrors = validateAll(values);
  const errors: Errors = triedSubmit
    ? allErrors
    : (Object.fromEntries(Object.entries(allErrors).filter(([f]) => touched[f as Field])) as Errors);

  const required = requiredFields(values.purpose);
  const doneCount = required.filter((f) => values[f].trim() && !validateField(f, values)).length;
  const progress = Math.round((doneCount / required.length) * 100);

  // Functional updates, so several fields changing at once (browser autofill) all keep their values.
  const update = (field: Field, value: string) => setValues((prev) => ({ ...prev, [field]: value }));
  const blur = (field: Field) => setTouched((t) => ({ ...t, [field]: true }));
  const choosePurpose = (purpose: Purpose) => {
    setValues((prev) => ({ ...prev, purpose }));
    setTouched((t) => ({ ...t, purpose: true }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement)?.checked) return; // spam bot

    setTriedSubmit(true);
    const found = validateAll(values);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      const target =
        first === "purpose"
          ? document.querySelector<HTMLInputElement>(`[name="${id}-purpose"]`)
          : document.getElementById(`${id}-${first}`);
      target?.focus();
      return;
    }

    if (channel === "whatsapp") sendOnWhatsApp();
    else await sendByEmail();
  };

  const whatsappUrl = () => `${site.mobile.whatsapp}?text=${encodeURIComponent(summary(values))}`;

  /** Opens WhatsApp with the message ready. Runs inside the click, so browsers allow the new tab. */
  const sendOnWhatsApp = () => {
    window.open(whatsappUrl(), "_blank", "noopener");
    setSentVia("whatsapp");
    setStatus("sent");
  };

  const sendByEmail = async () => {
    const { serviceId, templateId, publicKey } = EMAILJS;
    if (!serviceId || !templateId || !publicKey) {
      console.error("Contact form: EmailJS keys are missing. Add them to .env.local (see .env.example) and rebuild.");
      setStatus("failed");
      return;
    }

    setStatus("sending");
    try {
      // Loaded only when someone presses Send, so it adds nothing to page load.
      const emailjs = (await import("@emailjs/browser")).default;
      const purpose = purposes.find((p) => p.value === values.purpose)?.label ?? "";
      await emailjs.send(
        serviceId,
        templateId,
        {
          subject: `Website: ${purpose} (${values.name.trim()})`,
          purpose,
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim() || "Not given",
          reply_to: values.email.trim() || undefined,
          company: values.company.trim() || "-",
          workers: values.workers.trim() || "-",
          work: values.work.trim() || "-",
          country: values.country || "-",
          message: values.message.trim(),
          summary: summary(values),
        },
        { publicKey },
      );
      setSentVia("email");
      setStatus("sent");
    } catch (err) {
      console.error("Contact form: EmailJS could not send the message.", err);
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div className={styles.done} role="status">
        <span className={styles.tick}>
          <CheckCircle2 size={32} aria-hidden />
        </span>
        <p className={styles.doneTitle}>Thank you, {values.name.trim().split(" ")[0]}.</p>
        {sentVia === "email" ? (
          <p className={styles.doneText}>We have your message in our email. Our team will call you soon.</p>
        ) : (
          <>
            <p className={styles.doneText}>
              Your message is ready in WhatsApp. Please press <strong className={styles.strong}>send</strong> there, and our team
              will reply soon.
            </p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={styles.retry}>
              WhatsApp did not open? Tap here.
            </a>
          </>
        )}
        <button
          type="button"
          onClick={() => {
            setValues(emptyValues);
            setTouched({});
            setTriedSubmit(false);
            setStatus("idle");
          }}
          className={styles.again}
        >
          Send another message
        </button>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  /** Shared props and status icon for a text field. */
  const fieldProps = (field: Field) => {
    const error = errors[field];
    const isValid = (touched[field] || triedSubmit) && !error && values[field].trim() !== "";
    return {
      error,
      isValid,
      input: {
        id: `${id}-${field}`,
        name: field,
        value: values[field],
        onBlur: () => blur(field),
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? `${id}-${field}-error` : undefined,
        "aria-required": required.includes(field) || undefined,
        className: cn(styles.input, isValid && styles.valid),
      },
    };
  };

  const statusIcon = ({ isValid, error, textarea }: { isValid: boolean; error?: string; textarea?: boolean }) =>
    error ? (
      <AlertCircle aria-hidden className={cn(styles.status, styles.bad, textarea && styles.textareaStatus)} />
    ) : isValid ? (
      <CheckCircle2 aria-hidden className={cn(styles.status, styles.ok, textarea && styles.textareaStatus)} />
    ) : null;

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className={styles.error}>
        {errors[field]}
      </p>
    ) : null;

  const textField = ({
    field,
    label,
    icon: Icon,
    optional,
    ...rest
  }: { field: Field; label: string; icon: LucideIcon; optional?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) => {
    const p = fieldProps(field);
    return (
      <div className={styles.field}>
        <label htmlFor={p.input.id} className={styles.label}>
          {label} {optional ? <span className={styles.optional}>(optional)</span> : null}
        </label>
        <div className={styles.control}>
          <Icon aria-hidden className={styles.icon} />
          <input {...rest} {...p.input} onChange={(e) => update(field, e.target.value)} />
          {statusIcon({ isValid: p.isValid, error: p.error })}
        </div>
        {errorText(field)}
      </div>
    );
  };

  const countryField = () => {
    const p = fieldProps("country");
    return (
      <div className={styles.field}>
        <label htmlFor={p.input.id} className={styles.label}>
          {values.purpose === "hire" ? "Country of work" : "Country you want to work in"}
        </label>
        <div className={styles.control}>
          <Globe2 aria-hidden className={styles.icon} />
          <select {...p.input} onChange={(e) => update("country", e.target.value)}>
            <option value="">Choose a country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {statusIcon({ isValid: p.isValid, error: p.error })}
        </div>
        {errorText("country")}
      </div>
    );
  };

  const message = fieldProps("message");

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-describedby={`${id}-progress`}>
      <div className={styles.progress} aria-hidden>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <div>
            <h2 className={styles.title}>Send us a message</h2>
            <p className={styles.subtitle}>It takes about one minute. Our team will call you back.</p>
          </div>
          <p id={`${id}-progress`} className={styles.progressText}>
            {doneCount} of {required.length} done
          </p>
        </div>

        <fieldset className={cn(styles.field, errors.purpose && styles.choicesInvalid)}>
          <legend className={styles.legend}>I want to</legend>
          <div className={styles.choices}>
            {purposes.map((p) => (
              <label key={p.value} className={styles.choice}>
                <input
                  type="radio"
                  name={`${id}-purpose`}
                  value={p.value}
                  checked={values.purpose === p.value}
                  onChange={() => choosePurpose(p.value)}
                  aria-describedby={errors.purpose ? `${id}-purpose-error` : undefined}
                />
                <span>{p.label}</span>
              </label>
            ))}
          </div>
          {errorText("purpose")}
        </fieldset>

        <div className={styles.row}>
          {textField({ field: "name", label: "Your name", icon: User, autoComplete: "name", placeholder: "Ram Bahadur Thapa" })}
          {textField({
            field: "phone",
            label: "Phone number",
            icon: Phone,
            type: "tel",
            inputMode: "tel",
            autoComplete: "tel",
            placeholder: "98XXXXXXXX",
          })}
        </div>

        {textField({
          field: "email",
          label: "Email",
          icon: Mail,
          optional: true,
          type: "email",
          inputMode: "email",
          autoComplete: "email",
          placeholder: "name@gmail.com",
        })}

        {values.purpose === "hire" ? (
          <div className={styles.extra}>
            {textField({ field: "company", label: "Company name", icon: Building2, autoComplete: "organization" })}
            <div className={styles.row}>
              {textField({
                field: "workers",
                label: "How many workers?",
                icon: Users,
                inputMode: "numeric",
                placeholder: "For example 20",
              })}
              {countryField()}
            </div>
          </div>
        ) : null}

        {values.purpose === "job" ? (
          <div className={styles.extra}>
            <div className={styles.row}>
              {textField({
                field: "work",
                label: "What work do you do?",
                icon: Hammer,
                placeholder: "For example cook, driver, mason",
              })}
              {countryField()}
            </div>
          </div>
        ) : null}

        <div className={styles.field}>
          <label htmlFor={message.input.id} className={styles.label}>
            Message
          </label>
          <div className={styles.control}>
            <MessageSquareText aria-hidden className={cn(styles.icon, styles.textareaIcon)} />
            <textarea
              {...message.input}
              maxLength={MESSAGE_MAX + 50}
              placeholder={messageHints[values.purpose]}
              onChange={(e) => update("message", e.target.value)}
            />
            {statusIcon({ isValid: message.isValid, error: message.error, textarea: true })}
          </div>
          <div className={styles.helpRow}>
            {errorText("message")}
            <span className={cn(styles.counter, values.message.length > MESSAGE_MAX && styles.counterWarn)}>
              {values.message.length} / {MESSAGE_MAX}
            </span>
          </div>
        </div>

        <label className={styles.trap} aria-hidden>
          Do not fill this <input type="checkbox" name="botcheck" tabIndex={-1} />
        </label>

        {triedSubmit && errorCount > 0 ? (
          <p className={styles.summary} role="alert">
            <AlertCircle size={16} className={styles.noShrink} aria-hidden />
            {errorCount === 1 ? "Please fix 1 thing above." : `Please fix ${errorCount} things above.`}
          </p>
        ) : null}
        {status === "failed" ? (
          <div className={styles.summary} role="alert">
            <AlertCircle size={16} className={styles.noShrink} aria-hidden />
            <span className={styles.summaryText}>
              Sorry, the email did not send. You can send it on WhatsApp instead, or call us on {site.phone.intl}.
            </span>
            <button type="button" onClick={() => (setChannel("whatsapp"), sendOnWhatsApp())} className={styles.fallback}>
              <WhatsAppIcon size={16} /> Send on WhatsApp
            </button>
          </div>
        ) : null}

        <div className={styles.sendBlock}>
          <div className={styles.sendRow}>
            <fieldset className={styles.channel}>
              <legend className={styles.srOnly}>How do you want to send your message?</legend>
              <div className={styles.track} data-channel={channel}>
                <span aria-hidden className={styles.thumb} />
                <label className={styles.option}>
                  <input
                    type="radio"
                    name={`${id}-channel`}
                    value="email"
                    checked={channel === "email"}
                    onChange={() => chooseChannel("email")}
                  />
                  <span>
                    <Mail size={16} aria-hidden /> Email
                  </span>
                </label>
                <label className={styles.option}>
                  <input
                    type="radio"
                    name={`${id}-channel`}
                    value="whatsapp"
                    checked={channel === "whatsapp"}
                    onChange={() => chooseChannel("whatsapp")}
                  />
                  <span>
                    <WhatsAppIcon size={16} /> WhatsApp
                  </span>
                </label>
              </div>
            </fieldset>

            <button
              type="submit"
              className={cn(styles.submit, channel === "whatsapp" && styles.submitWhatsapp)}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : channel === "whatsapp" ? "Send on WhatsApp" : "Send by email"}
              <span className={styles.submitChip} aria-hidden>
                {status === "sending" ? (
                  <Loader2 size={16} className={styles.spin} />
                ) : channel === "whatsapp" ? (
                  <WhatsAppIcon size={16} />
                ) : (
                  <Mail size={16} />
                )}
              </span>
            </button>
          </div>

          <p className={styles.sendHint} aria-live="polite">
            {channel === "whatsapp"
              ? "Opens WhatsApp with your message ready. Just press send."
              : "Goes straight to our email. Our team will call you back."}{" "}
            <span className={styles.privacy}>We only use your details to reply to you.</span>
          </p>
        </div>
      </div>
    </form>
  );
}

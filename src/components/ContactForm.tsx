"use client";

import { useRef, useState } from "react";
import { CONTACT_TOPICS, MESSAGE_MAX, validateContact, type ContactErrors, type ContactValues } from "@/lib/contact";
import { buttonClass, Field, INPUT } from "./ui";

const INITIAL: ContactValues = { name: "", email: "", topic: CONTACT_TOPICS[0], message: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(INITIAL);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const a11y = (key: keyof ContactValues) => ({
    id: key,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setSentTo(values.name.trim());
    setValues(INITIAL);
    requestAnimationFrame(() => doneRef.current?.focus());
  }

  if (sentTo !== null) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-3xl bg-white/70 p-8 ring-1 ring-charcoal/5 outline-none">
        <p className="text-xl font-semibold">Thanks, {sentTo}!</p>
        <p className="mt-2 leading-relaxed text-charcoal/70">
          Online messaging isn’t connected yet, so this message wasn’t sent. Our FAQ answers the most common questions
          in the meantime.
        </p>
        <button type="button" onClick={() => setSentTo(null)} className={buttonClass("outline", "mt-6")}>
          Write another message
        </button>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl bg-white/70 p-6 ring-1 ring-charcoal/5 sm:p-8">
      {errorCount > 0 && (
        <p role="alert" className="rounded-2xl border border-red-700/30 bg-red-50 px-4 py-3 text-sm text-red-800">
          Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} below.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input {...a11y("name")} autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} className={INPUT} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            {...a11y("email")}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={INPUT}
          />
        </Field>
      </div>
      <Field id="topic" label="Topic" error={errors.topic}>
        <select
          {...a11y("topic")}
          value={values.topic}
          onChange={(e) => set("topic", e.target.value as ContactValues["topic"])}
          className={INPUT}
        >
          {CONTACT_TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field id="message" label="Message" error={errors.message}>
        <textarea
          {...a11y("message")}
          rows={6}
          maxLength={MESSAGE_MAX}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className={INPUT}
        />
      </Field>
      <button type="submit" className={buttonClass("primary", "w-full sm:w-auto")}>
        Send message
      </button>
    </form>
  );
}

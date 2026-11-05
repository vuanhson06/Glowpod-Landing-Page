"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { isValidEmail } from "@/lib/checkout";
import { buttonClass, INPUT } from "./ui";

export function EmailSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address, like linh@example.com.");
      return;
    }
    setEmail("");
    setError("");
    router.push("/subscribed");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <label htmlFor="signup-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "signup-email-error" : undefined}
          className={`${INPUT.replace("mt-1 ", "")} flex-1`}
        />
        <button type="submit" className={buttonClass("primary", "shrink-0")}>
          Sign up
        </button>
      </div>
      {error && (
        <p id="signup-email-error" role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}

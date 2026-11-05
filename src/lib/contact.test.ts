import { describe, expect, it } from "vitest";
import { isValidEmail } from "./checkout";
import { MESSAGE_MAX, validateContact, type ContactValues } from "./contact";

const OK: ContactValues = {
  name: "Linh Nguyen",
  email: "linh@example.com",
  topic: "Product question",
  message: "Which shades does the Starter Kit cover?",
};

describe("validateContact", () => {
  it("accepts a complete message", () => {
    expect(validateContact(OK)).toEqual({});
  });

  it("flags every missing field", () => {
    const errors = validateContact({ name: " ", email: "nope", topic: "x" as ContactValues["topic"], message: "hi" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "topic"]);
  });

  it("rejects messages over the limit", () => {
    expect(validateContact({ ...OK, message: "a".repeat(MESSAGE_MAX + 1) }).message).toMatch(/under/);
  });
});

describe("isValidEmail", () => {
  it("trims and checks shape", () => {
    expect(isValidEmail("  linh@example.com ")).toBe(true);
    expect(isValidEmail("linh@example")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

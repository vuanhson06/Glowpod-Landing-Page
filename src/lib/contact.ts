import { isValidEmail } from "./checkout";

export const CONTACT_TOPICS = [
  "Product question",
  "Orders and delivery",
  "Returns",
  "Partnerships and press",
  "Something else",
] as const;

export type ContactValues = {
  name: string;
  email: string;
  topic: (typeof CONTACT_TOPICS)[number];
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const MESSAGE_MAX = 2000;

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (v.name.trim().length < 2) errors.name = "Enter your name.";
  if (!isValidEmail(v.email)) errors.email = "Enter a valid email address, like linh@example.com.";
  if (!CONTACT_TOPICS.includes(v.topic)) errors.topic = "Choose a topic.";
  const len = v.message.trim().length;
  if (len < 10) errors.message = "Write a little more so we can help (at least 10 characters).";
  else if (len > MESSAGE_MAX) errors.message = `Keep your message under ${MESSAGE_MAX} characters.`;
  return errors;
}

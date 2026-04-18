import test from "node:test";
import assert from "node:assert/strict";
import {
  requireEmail,
  requireNumber,
  normalizeRole,
  normalizeText,
  requireNavigationQuery,
  requireText
} from "./requestValidation.js";

test("normalizeText falls back when incoming string is empty", () => {
  assert.equal(normalizeText("   ", "fallback"), "fallback");
});

test("normalizeRole defaults unknown roles to attendee", () => {
  assert.equal(normalizeRole("speaker"), "attendee");
});

test("requireText throws a 400-style validation error for empty values", () => {
  assert.throws(
    () => requireText("", "question"),
    (error) => error.statusCode === 400 && /question is required/i.test(error.message)
  );
});

test("requireNavigationQuery returns normalized from/to values", () => {
  const result = requireNavigationQuery(" Entrance ", " Hall A ");
  assert.deepEqual(result, { from: "Entrance", to: "Hall A" });
});

test("requireEmail validates email format", () => {
  assert.equal(requireEmail("hello@example.com"), "hello@example.com");
  assert.throws(() => requireEmail("bad-email"), /valid email address/i);
});

test("requireNumber validates numeric values", () => {
  assert.equal(requireNumber("15", "minutesBefore"), 15);
  assert.throws(() => requireNumber("abc", "minutesBefore"), /valid number/i);
});

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function normalizeText(value, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim();
  return normalized || fallback;
}

export function requireText(value, fieldName) {
  const normalized = normalizeText(value);
  if (!normalized) {
    const error = new Error(`${fieldName} is required.`);
    error.statusCode = 400;
    throw error;
  }
  return normalized;
}

export function requireEmail(value, fieldName = "email") {
  const email = requireText(value, fieldName);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    const error = new Error(`${fieldName} must be a valid email address.`);
    error.statusCode = 400;
    throw error;
  }

  return email;
}

export function requireNumber(value, fieldName) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    const error = new Error(`${fieldName} must be a valid number.`);
    error.statusCode = 400;
    throw error;
  }

  return parsed;
}

export function normalizeArray(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .map((value) => normalizeText(value))
    .filter(Boolean);
}

export function normalizeRole(role) {
  const normalized = normalizeText(role, "attendee").toLowerCase();
  return ["attendee", "organizer", "volunteer"].includes(normalized)
    ? normalized
    : "attendee";
}

export function normalizeUserContext(payload = {}) {
  return {
    id: normalizeText(payload.id, "demo-user-1"),
    name: normalizeText(payload.name, "Event Participant"),
    email: normalizeText(payload.email),
    role: normalizeRole(payload.role),
    interests: normalizeArray(payload.interests)
  };
}

export function requireNavigationQuery(from, to) {
  const source = requireText(from, "from");
  const destination = requireText(to, "to");

  return { from: source, to: destination };
}

export function ensureObject(value, fieldName) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    const error = new Error(`${fieldName} must be an object.`);
    error.statusCode = 400;
    throw error;
  }

  return value;
}

export function optionalText(value, fallback = "") {
  return isNonEmptyString(value) ? value.trim() : fallback;
}

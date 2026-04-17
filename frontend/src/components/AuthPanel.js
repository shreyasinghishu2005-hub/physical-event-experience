"use client";

import { useState } from "react";

const roles = ["attendee", "organizer", "volunteer"];

export default function AuthPanel({ onContinue }) {
  const [form, setForm] = useState({
    name: "Aarav Mehta",
    email: "aarav@example.com",
    role: "attendee"
  });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onContinue(form);
  }

  return (
    <main className="page-shell auth-shell">
      <section className="card auth-card">
        <p className="eyebrow">Event Access</p>
        <h1>Sign in to your event experience</h1>
        <p className="auth-copy">
          Explore personalized schedules, crowd insights, networking suggestions, safety tools, and volunteer workflows.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={updateField} />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} />
          </label>
          <label>
            Role
            <select name="role" value={form.role} onChange={updateField}>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Enter Dashboard</button>
        </form>
      </section>
    </main>
  );
}
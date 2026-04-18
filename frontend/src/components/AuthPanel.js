"use client";

import { useState } from "react";

const roles = ["attendee", "organizer", "volunteer"];
const suggestedInterests = ["ai", "web", "product", "operations", "safety", "community", "networking"];

export default function AuthPanel({ onContinue }) {
  const [form, setForm] = useState({
    name: "Aarav Mehta",
    email: "aarav@example.com",
    role: "attendee",
    interests: ["ai", "web", "product"]
  });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleInterest(interest) {
    setForm((current) => {
      const alreadySelected = current.interests.includes(interest);
      return {
        ...current,
        interests: alreadySelected
          ? current.interests.filter((entry) => entry !== interest)
          : [...current.interests, interest]
      };
    });
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
          Explore a role-aware assistant with personalized schedules, crowd insights, networking suggestions, safety tools, and volunteer workflows.
        </p>
        <form className="auth-form" onSubmit={handleSubmit} aria-describedby="auth-helper">
          <p id="auth-helper">
            Choose your role and interests so the dashboard can make smarter recommendations and operational decisions.
          </p>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={updateField}
              autoComplete="name"
              required
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
              required
            />
          </label>
          <label htmlFor="role">
            Role
            <select id="role" name="role" value={form.role} onChange={updateField}>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend>Interests</legend>
            <p>Select the areas you care about most.</p>
            <div className="interest-grid">
              {suggestedInterests.map((interest) => (
                <label key={interest}>
                  <input
                    type="checkbox"
                    checked={form.interests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </fieldset>
          <button type="submit">Enter Dashboard</button>
        </form>
      </section>
    </main>
  );
}

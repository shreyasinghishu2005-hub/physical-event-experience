import test from "node:test";
import assert from "node:assert/strict";
import { answerQuestion, generateRecommendations } from "./aiService.js";
import { getDashboard } from "./eventService.js";

test("generateRecommendations returns an action summary for organizer context", async () => {
  const result = await generateRecommendations({
    role: "organizer",
    interests: ["operations", "ai", "community"]
  });

  assert.ok(result.sessions.length > 0);
  assert.match(result.actionSummary, /announcements|operational/i);
});

test("answerQuestion gives crowd-aware fallback guidance", async () => {
  const result = await answerQuestion("Is Hall A crowded right now?", "en", {
    role: "attendee",
    interests: ["ai"]
  });

  assert.match(result.answer, /Hall A|crowd/i);
});

test("getDashboard adapts the persona based on user context", async () => {
  const dashboard = await getDashboard("demo-user-1", {
    role: "volunteer",
    interests: ["operations", "safety"],
    name: "Test Volunteer"
  });

  assert.equal(dashboard.user.role, "volunteer");
  assert.equal(dashboard.user.name, "Test Volunteer");
  assert.equal(dashboard.assistantContext.persona, "volunteer");
  assert.ok(dashboard.smartAlerts.length > 0);
});

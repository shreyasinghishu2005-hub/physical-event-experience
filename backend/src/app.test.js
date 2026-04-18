import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./app.js";

async function withTestServer(run) {
  const app = createApp();
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
  });

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    await run(baseUrl);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

test("health endpoint returns ok", async () => {
  await withTestServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(data, { status: "ok" });
  });
});

test("dashboard endpoint adapts role and interests from query parameters", async () => {
  await withTestServer(async (baseUrl) => {
    const response = await fetch(
      `${baseUrl}/api/event/dashboard/demo-user-1?role=organizer&interests=operations,community`
    );
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.user.role, "organizer");
    assert.deepEqual(data.user.interests, ["operations", "community"]);
    assert.equal(data.assistantContext.decisionMode, "operations");
  });
});

test("chat endpoint rejects empty questions with a 400 response", async () => {
  await withTestServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: "" })
    });
    const data = await response.json();

    assert.equal(response.status, 400);
    assert.match(data.message, /question is required/i);
  });
});

test("navigation endpoint rejects missing query parameters", async () => {
  await withTestServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/event/navigation?from=Entrance`);
    const data = await response.json();

    assert.equal(response.status, 400);
    assert.match(data.message, /to is required/i);
  });
});

test("auth signup validates required fields and returns created users", async () => {
  await withTestServer(async (baseUrl) => {
    const invalidResponse = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: "missing-name@example.com" })
    });

    const validResponse = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Aditi Sharma",
        email: "aditi@example.com",
        role: "volunteer"
      })
    });

    const invalidData = await invalidResponse.json();
    const validData = await validResponse.json();

    assert.equal(invalidResponse.status, 400);
    assert.match(invalidData.message, /name is required/i);
    assert.equal(validResponse.status, 201);
    assert.equal(validData.user.role, "volunteer");
  });
});

test("notification endpoints validate payloads and create reminders", async () => {
  await withTestServer(async (baseUrl) => {
    const invalidRegister = await fetch(`${baseUrl}/api/notifications/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: "" })
    });

    const validReminder = await fetch(`${baseUrl}/api/notifications/reminder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sessionTitle: "AI Keynote", minutesBefore: 15 })
    });

    const invalidRegisterData = await invalidRegister.json();
    const validReminderData = await validReminder.json();

    assert.equal(invalidRegister.status, 400);
    assert.match(invalidRegisterData.message, /token is required/i);
    assert.equal(validReminder.status, 200);
    assert.match(validReminderData.reminder.title, /AI Keynote/);
  });
});

test("safety and feedback endpoints validate payloads", async () => {
  await withTestServer(async (baseUrl) => {
    const invalidSos = await fetch(`${baseUrl}/api/safety/sos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ location: "Hall A" })
    });

    const validFeedback = await fetch(`${baseUrl}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: "demo-user-1", feedback: "Great support from volunteers." })
    });

    const invalidSosData = await invalidSos.json();
    const validFeedbackData = await validFeedback.json();

    assert.equal(invalidSos.status, 400);
    assert.match(invalidSosData.message, /userId is required/i);
    assert.equal(validFeedback.status, 200);
    assert.equal(validFeedbackData.sentiment.sentiment, "positive");
  });
});

test("volunteer and networking endpoints validate request payloads", async () => {
  await withTestServer(async (baseUrl) => {
    const invalidTask = await fetch(`${baseUrl}/api/volunteers/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ assignee: "Volunteer Neha" })
    });

    const validConnection = await fetch(`${baseUrl}/api/networking/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requesterId: "demo-user-1", targetUserId: "match-1" })
    });

    const invalidTaskData = await invalidTask.json();
    const validConnectionData = await validConnection.json();

    assert.equal(invalidTask.status, 400);
    assert.match(invalidTaskData.message, /title is required/i);
    assert.equal(validConnection.status, 200);
    assert.equal(validConnectionData.connectionStatus, "pending");
  });
});

test("security headers are applied to API responses", async () => {
  await withTestServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);

    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  });
});

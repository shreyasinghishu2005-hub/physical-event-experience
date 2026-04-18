const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function fetchDashboard(userId) {
  return request(`/event/dashboard/${userId}`);
}

export function askChatbot(question) {
  return request("/ai/chat", {
    method: "POST",
    body: JSON.stringify({ question, language: "en" })
  });
}

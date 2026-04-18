const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

function buildQuery(params = {}) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      search.set(key, value.join(","));
      return;
    }

    if (typeof value === "string" && value.trim()) {
      search.set(key, value.trim());
    }
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}

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

export function fetchDashboard(user) {
  const userId = user?.id || "demo-user-1";
  const query = buildQuery({
    name: user?.name,
    email: user?.email,
    role: user?.role,
    interests: user?.interests
  });

  return request(`/event/dashboard/${userId}${query}`);
}

export function askChatbot(question, user) {
  return request("/ai/chat", {
    method: "POST",
    body: JSON.stringify({ question, language: "en", user })
  });
}

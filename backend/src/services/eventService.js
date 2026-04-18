import {
  announcements,
  density,
  leaderboard,
  matches,
  navigationGraph,
  notifications,
  sessions,
  users,
  volunteerTasks
} from "../data/mockData.js";
import { shortestPath } from "../utils/routePlanner.js";
import { generateRecommendations } from "./aiService.js";
import { normalizeArray, normalizeRole, normalizeText } from "../utils/requestValidation.js";

function buildSmartAlerts(user) {
  const busiestZone = [...density].sort((left, right) => right.count - left.count)[0];
  const alerts = [
    {
      id: "alert-next-session",
      title: "Next step",
      message: `${user.nextSession.title} starts at ${user.nextSession.time} in ${user.nextSession.location}.`
    }
  ];

  if (user.role === "organizer") {
    alerts.push({
      id: "alert-crowd-balance",
      title: "Operational suggestion",
      message: `${busiestZone.zone} is the busiest zone right now. Consider pushing a reroute announcement and shifting volunteer coverage.`
    });
  }

  if (user.role === "volunteer") {
    alerts.push({
      id: "alert-safety-support",
      title: "Volunteer priority",
      message: "Stay near Help Desk during high-footfall periods and keep QR scanner support ready."
    });
  }

  if (user.role === "attendee") {
    alerts.push({
      id: "alert-networking-window",
      title: "Smart suggestion",
      message: "Lounge C is quieter right now, which makes it a good time for networking or a short break."
    });
  }

  return alerts;
}

function mergeUserContext(baseUser, userContext = {}) {
  const role = normalizeRole(userContext.role || baseUser.role);
  const interests = normalizeArray(userContext.interests);

  return {
    ...baseUser,
    name: normalizeText(userContext.name, baseUser.name),
    email: normalizeText(userContext.email, baseUser.email),
    role,
    interests: interests.length ? interests : baseUser.interests
  };
}

export async function getDashboard(userId, userContext = {}) {
  const matchedUser =
    users.find((entry) => entry.id === userId) ||
    users.find((entry) => entry.role === normalizeRole(userContext.role)) ||
    users[0];
  const user = mergeUserContext(matchedUser, userContext);
  const recommendations = await generateRecommendations(user);

  return {
    user,
    schedule: sessions,
    recommendations,
    announcements,
    density,
    navigation: {
      zones: density.map((item) => ({
        id: item.zone,
        name: item.zone,
        density: item.status
      })),
      route: shortestPath(navigationGraph, "Entrance", user.nextSession.location)
    },
    networking: {
      matches
    },
    smartAlerts: buildSmartAlerts(user),
    assistantContext: {
      persona: user.role,
      decisionMode:
        user.role === "organizer"
          ? "operations"
          : user.role === "volunteer"
            ? "support"
            : "experience",
      googleServices: [
        "Firebase Authentication",
        "Cloud Firestore",
        "Firebase Cloud Messaging",
        "Gemini API",
        "Google Maps Platform",
        "Google Calendar"
      ]
    },
    leaderboard,
    volunteerTasks,
    notifications,
    feedbackSummary: {
      positive: 72,
      neutral: 19,
      negative: 9
    }
  };
}

export function getAllSessions() {
  return sessions;
}

export function createBookmark(payload) {
  return {
    success: true,
    ...payload
  };
}

export function createCheckIn(payload) {
  return {
    success: true,
    pointsAwarded: 15,
    crowdStatus: density.find((item) => item.zone === payload.location)?.status || "medium",
    ...payload
  };
}

export function getNavigation(from, to) {
  return {
    from,
    to,
    path: shortestPath(navigationGraph, from, to)
  };
}

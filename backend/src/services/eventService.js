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

export async function getDashboard(userId) {
  const user = users.find((entry) => entry.id === userId) || users[0];
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
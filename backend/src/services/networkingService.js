import { matches } from "../data/mockData.js";

export function getMatches(userId) {
  return {
    userId,
    matches
  };
}

export function connectUsers(payload) {
  return {
    success: true,
    connectionStatus: "pending",
    ...payload
  };
}
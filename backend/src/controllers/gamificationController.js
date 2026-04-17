import { leaderboard } from "../data/mockData.js";

export function getLeaderboard(request, response) {
  response.json(leaderboard);
}
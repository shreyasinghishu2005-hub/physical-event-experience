import {
  createBookmark,
  createCheckIn,
  getAllSessions,
  getDashboard,
  getNavigation
} from "../services/eventService.js";

export async function dashboard(request, response, next) {
  try {
    const data = await getDashboard(request.params.userId);
    response.json(data);
  } catch (error) {
    next(error);
  }
}

export function sessions(request, response) {
  response.json(getAllSessions());
}

export function bookmarks(request, response) {
  response.json(createBookmark(request.body));
}

export function checkIn(request, response) {
  response.json(createCheckIn(request.body));
}

export function navigation(request, response) {
  const { from, to } = request.query;
  response.json(getNavigation(from, to));
}
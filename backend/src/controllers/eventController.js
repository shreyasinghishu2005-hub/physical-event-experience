import {
  createBookmark,
  createCheckIn,
  getAllSessions,
  getDashboard,
  getNavigation
} from "../services/eventService.js";
import {
  ensureObject,
  normalizeArray,
  normalizeRole,
  normalizeText,
  requireNavigationQuery
} from "../utils/requestValidation.js";

export async function dashboard(request, response, next) {
  try {
    const userContext = {
      name: normalizeText(request.query.name),
      email: normalizeText(request.query.email),
      role: normalizeRole(request.query.role),
      interests: normalizeArray(request.query.interests?.split(","))
    };
    const data = await getDashboard(request.params.userId, userContext);
    response.json(data);
  } catch (error) {
    next(error);
  }
}

export function sessions(request, response) {
  response.json(getAllSessions());
}

export function bookmarks(request, response, next) {
  try {
    response.json(createBookmark(ensureObject(request.body, "bookmark")));
  } catch (error) {
    next(error);
  }
}

export function checkIn(request, response, next) {
  try {
    response.json(createCheckIn(ensureObject(request.body, "check-in")));
  } catch (error) {
    next(error);
  }
}

export function navigation(request, response, next) {
  try {
    const { from, to } = requireNavigationQuery(request.query.from, request.query.to);
    response.json(getNavigation(from, to));
  } catch (error) {
    next(error);
  }
}

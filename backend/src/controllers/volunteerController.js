import {
  getVolunteerTasks,
  upsertVolunteerTask
} from "../services/volunteerService.js";
import { ensureObject, optionalText, requireText } from "../utils/requestValidation.js";

export function tasks(request, response) {
  response.json(getVolunteerTasks());
}

export function upsertTask(request, response, next) {
  try {
    const payload = ensureObject(request.body, "task");
    response.json(
      upsertVolunteerTask({
        id: optionalText(payload.id),
        title: requireText(payload.title, "title"),
        assignee: requireText(payload.assignee, "assignee"),
        status: optionalText(payload.status, "queued")
      })
    );
  } catch (error) {
    next(error);
  }
}

import {
  getVolunteerTasks,
  upsertVolunteerTask
} from "../services/volunteerService.js";

export function tasks(request, response) {
  response.json(getVolunteerTasks());
}

export function upsertTask(request, response) {
  response.json(upsertVolunteerTask(request.body));
}
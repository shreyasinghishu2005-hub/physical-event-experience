import { volunteerTasks } from "../data/mockData.js";

export function getVolunteerTasks() {
  return volunteerTasks;
}

export function upsertVolunteerTask(task) {
  return {
    success: true,
    task
  };
}
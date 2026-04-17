import {
  createReminder,
  registerNotificationToken
} from "../services/notificationService.js";

export async function register(request, response, next) {
  try {
    const data = await registerNotificationToken(request.body);
    response.json(data);
  } catch (error) {
    next(error);
  }
}

export async function reminder(request, response, next) {
  try {
    const data = await createReminder(request.body);
    response.json(data);
  } catch (error) {
    next(error);
  }
}
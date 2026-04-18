import {
  createReminder,
  registerNotificationToken
} from "../services/notificationService.js";
import {
  ensureObject,
  optionalText,
  requireNumber,
  requireText
} from "../utils/requestValidation.js";

export async function register(request, response, next) {
  try {
    const payload = ensureObject(request.body, "notification registration");
    const data = await registerNotificationToken({
      token: requireText(payload.token, "token"),
      platform: optionalText(payload.platform, "web")
    });
    response.json(data);
  } catch (error) {
    next(error);
  }
}

export async function reminder(request, response, next) {
  try {
    const payload = ensureObject(request.body, "reminder");
    const data = await createReminder({
      sessionTitle: requireText(payload.sessionTitle, "sessionTitle"),
      minutesBefore: requireNumber(payload.minutesBefore, "minutesBefore")
    });
    response.json(data);
  } catch (error) {
    next(error);
  }
}

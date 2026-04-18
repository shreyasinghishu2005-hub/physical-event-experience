import { createSosAlert, getHelpDesks } from "../services/safetyService.js";
import { ensureObject, optionalText, requireText } from "../utils/requestValidation.js";

export function helpDesks(request, response) {
  response.json(getHelpDesks());
}

export function sos(request, response, next) {
  try {
    const payload = ensureObject(request.body, "sos");
    response.json(
      createSosAlert({
        userId: requireText(payload.userId, "userId"),
        location: requireText(payload.location, "location"),
        message: optionalText(payload.message, "Emergency support requested.")
      })
    );
  } catch (error) {
    next(error);
  }
}

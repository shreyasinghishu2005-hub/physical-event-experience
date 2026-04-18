import { connectUsers, getMatches } from "../services/networkingService.js";
import { ensureObject, requireText } from "../utils/requestValidation.js";

export function matches(request, response) {
  response.json(getMatches(request.params.userId));
}

export function connect(request, response, next) {
  try {
    const payload = ensureObject(request.body, "connection");
    response.json(
      connectUsers({
        requesterId: requireText(payload.requesterId, "requesterId"),
        targetUserId: requireText(payload.targetUserId, "targetUserId")
      })
    );
  } catch (error) {
    next(error);
  }
}

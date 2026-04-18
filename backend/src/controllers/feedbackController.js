import { submitFeedback } from "../services/feedbackService.js";
import { ensureObject, optionalText, requireText } from "../utils/requestValidation.js";

export async function feedback(request, response, next) {
  try {
    const payload = ensureObject(request.body, "feedback");
    const data = await submitFeedback({
      userId: optionalText(payload.userId, "anonymous"),
      feedback: requireText(payload.feedback, "feedback")
    });
    response.json(data);
  } catch (error) {
    next(error);
  }
}

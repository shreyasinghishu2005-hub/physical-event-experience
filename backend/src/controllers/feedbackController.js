import { submitFeedback } from "../services/feedbackService.js";

export async function feedback(request, response, next) {
  try {
    const data = await submitFeedback(request.body);
    response.json(data);
  } catch (error) {
    next(error);
  }
}
import {
  analyzeSentiment,
  answerQuestion,
  generateAnnouncement,
  generateRecommendations
} from "../services/aiService.js";
import {
  ensureObject,
  normalizeUserContext,
  optionalText,
  requireText
} from "../utils/requestValidation.js";

export async function chat(request, response, next) {
  try {
    const question = requireText(request.body.question, "question");
    const language = optionalText(request.body.language, "en");
    const user = normalizeUserContext(request.body.user);
    const data = await answerQuestion(question, language, user);
    response.json(data);
  } catch (error) {
    next(error);
  }
}

export async function recommendations(request, response, next) {
  try {
    const user = normalizeUserContext(ensureObject(request.body.user || {}, "user"));
    const data = await generateRecommendations(user);
    response.json(data);
  } catch (error) {
    next(error);
  }
}

export async function sentiment(request, response, next) {
  try {
    const feedback = requireText(request.body.feedback, "feedback");
    const data = await analyzeSentiment(feedback);
    response.json(data);
  } catch (error) {
    next(error);
  }
}

export async function announcements(request, response, next) {
  try {
    const payload = ensureObject(request.body, "announcement");
    const data = await generateAnnouncement(payload);
    response.json(data);
  } catch (error) {
    next(error);
  }
}

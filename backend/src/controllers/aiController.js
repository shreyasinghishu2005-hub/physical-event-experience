import {
  analyzeSentiment,
  answerQuestion,
  generateAnnouncement,
  generateRecommendations
} from "../services/aiService.js";

export async function chat(request, response, next) {
  try {
    const data = await answerQuestion(request.body.question, request.body.language);
    response.json(data);
  } catch (error) {
    next(error);
  }
}

export async function recommendations(request, response, next) {
  try {
    const data = await generateRecommendations(request.body.user);
    response.json(data);
  } catch (error) {
    next(error);
  }
}

export async function sentiment(request, response, next) {
  try {
    const data = await analyzeSentiment(request.body.feedback);
    response.json(data);
  } catch (error) {
    next(error);
  }
}

export async function announcements(request, response, next) {
  try {
    const data = await generateAnnouncement(request.body);
    response.json(data);
  } catch (error) {
    next(error);
  }
}
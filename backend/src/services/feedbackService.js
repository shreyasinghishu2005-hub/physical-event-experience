import { analyzeSentiment } from "./aiService.js";

export async function submitFeedback(payload) {
  const sentiment = await analyzeSentiment(payload.feedback);
  return {
    success: true,
    ...payload,
    sentiment
  };
}
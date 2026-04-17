import { matches, sessions } from "../data/mockData.js";

function inferSentiment(text) {
  const normalized = text.toLowerCase();
  if (/(great|good|helpful|amazing|excellent)/.test(normalized)) {
    return "positive";
  }
  if (/(bad|crowded|late|poor|confusing)/.test(normalized)) {
    return "negative";
  }
  return "neutral";
}

export async function answerQuestion(question, language = "en") {
  const normalized = question.toLowerCase();

  if (normalized.includes("hall a")) {
    return {
      answer:
        language === "en"
          ? "Hall A is past Registration on the left corridor. Follow the signage toward the keynote zone."
          : "Hall A is near the keynote zone after Registration."
    };
  }

  if (normalized.includes("next session")) {
    return {
      answer: "Your next saved session is Designing AI-Native Products at 11:00 AM in Hall A."
    };
  }

  return {
    answer:
      "I can help with venue directions, schedules, announcements, safety desks, and session guidance."
  };
}

export async function generateRecommendations(user) {
  const recommendedSessions = sessions
    .filter((session) => session.interests.some((interest) => user.interests.includes(interest)))
    .map((session) => ({
      id: session.id,
      title: session.title,
      reason: `Recommended because it matches your interests in ${session.interests.join(", ")}.`
    }));

  const trending = [...sessions]
    .sort((left, right) => right.crowdScore - left.crowdScore)
    .slice(0, 3)
    .map((session) => ({
      id: session.id,
      title: session.title,
      score: `${session.crowdScore}/100`
    }));

  return {
    sessions: recommendedSessions,
    trending,
    people: matches
  };
}

export async function analyzeSentiment(feedback) {
  const sentiment = inferSentiment(feedback);
  return {
    sentiment,
    summary: `The feedback appears ${sentiment}.`
  };
}

export async function generateAnnouncement(context) {
  return {
    title: `${context.type} update for ${context.location}`,
    message: `Please note a ${context.type.toLowerCase()} affecting ${context.location}. ${context.details} Volunteers and help desks have been informed.`
  };
}
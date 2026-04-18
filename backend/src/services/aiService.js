import { env } from "../config/env.js";
import { density, matches, sessions } from "../data/mockData.js";

function buildRoleHint(role) {
  if (role === "organizer") {
    return "Focus on operational awareness, announcements, crowd risks, and coordination decisions.";
  }

  if (role === "volunteer") {
    return "Prioritize rapid guidance, task clarity, safety routing, and attendee assistance.";
  }

  return "Prioritize attendee convenience, personalization, schedules, and networking value.";
}

function extractZoneFromQuestion(question) {
  const normalized = question.toLowerCase();
  return density.find((zone) => normalized.includes(zone.zone.toLowerCase()))?.zone;
}

async function generateGeminiResponse(prompt) {
  if (!env.geminiApiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${env.geminiModel}:generateContent?key=${env.geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.map((part) => part.text).join(" ").trim() || null;
  } catch {
    return null;
  }
}

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

function buildFallbackAnswer(question, language, userContext) {
  const normalized = question.toLowerCase();
  const zone = extractZoneFromQuestion(question);
  const crowdedZone = [...density].sort((left, right) => right.count - left.count)[0];
  const nextSession = userContext.nextSession || {
    title: "Designing AI-Native Products",
    time: "11:00 AM",
    location: "Hall A"
  };

  if (normalized.includes("hall a")) {
    return {
      answer:
        language === "en"
          ? "Hall A is past Registration on the left corridor. Follow the signage toward the keynote zone."
          : "Hall A is near the keynote zone after Registration."
    };
  }

  if (zone) {
    const zoneStatus = density.find((item) => item.zone === zone);
    return {
      answer: `${zone} is currently showing ${zoneStatus.status} crowd density with around ${zoneStatus.count} attendees. ${
        zoneStatus.status === "high"
          ? "If possible, choose a quieter nearby zone before heading in."
          : "It should be comfortable to visit right now."
      }`,
      recommendedAction:
        zoneStatus.status === "high"
          ? `Delay your visit to ${zone} by 10-15 minutes or use alternate routes.`
          : `Proceed to ${zone} using the main route.`
    };
  }

  if (normalized.includes("next session")) {
    return {
      answer: `Your next scheduled session is ${nextSession.title} at ${nextSession.time} in ${nextSession.location}.`
    };
  }

  if (normalized.includes("crowd") || normalized.includes("busy")) {
    return {
      answer: `${crowdedZone.zone} is currently the busiest zone. ${
        userContext.role === "organizer"
          ? "Consider sending volunteers and publishing a rerouting announcement."
          : "You may want to explore quieter areas like Lounge C or Food Court first."
      }`
    };
  }

  return {
    answer: `I can help with venue directions, schedules, announcements, safety desks, session guidance, and role-specific event decisions for ${userContext.role}s.`
  };
}

export async function answerQuestion(question, language = "en", userContext = {}) {
  const prompt = [
    "You are an event operations assistant.",
    `User role: ${userContext.role || "attendee"}.`,
    `User interests: ${(userContext.interests || []).join(", ") || "general event discovery"}.`,
    buildRoleHint(userContext.role),
    "Keep answers practical, concise, and safe for real event use.",
    `Question: ${question}`
  ].join(" ");

  const geminiAnswer = await generateGeminiResponse(prompt);
  if (geminiAnswer) {
    return { answer: geminiAnswer, source: "gemini" };
  }

  return buildFallbackAnswer(question, language, userContext);
}

export async function generateRecommendations(user) {
  const interests = user.interests?.length ? user.interests : ["ai", "web"];
  const recommendedSessions = sessions
    .filter((session) => session.interests.some((interest) => interests.includes(interest)))
    .sort((left, right) => {
      const leftOverlap = left.interests.filter((interest) => interests.includes(interest)).length;
      const rightOverlap = right.interests.filter((interest) => interests.includes(interest)).length;
      return rightOverlap - leftOverlap || right.crowdScore - left.crowdScore;
    })
    .map((session) => ({
      id: session.id,
      title: session.title,
      reason: `Recommended because it matches your interests in ${session.interests.join(", ")}.`,
      fitScore: session.interests.filter((interest) => interests.includes(interest)).length * 25
    }));

  const trending = [...sessions]
    .sort((left, right) => right.crowdScore - left.crowdScore)
    .slice(0, 3)
    .map((session) => ({
      id: session.id,
      title: session.title,
      score: `${session.crowdScore}/100`
    }));

  const actionSummary =
    user.role === "organizer"
      ? "Prioritize crowd balancing, announcements, and high-traffic session monitoring."
      : user.role === "volunteer"
        ? "Focus on help desk proximity, safety-critical zones, and attendee support."
        : "Focus on sessions aligned to your interests and avoid overcrowded zones when possible.";

  return {
    sessions: recommendedSessions.slice(0, 4),
    trending,
    people: matches,
    actionSummary
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
  const safeContext = {
    type: context.type || "Event",
    location: context.location || "the venue",
    details: context.details || "Please follow staff instructions."
  };

  const prompt = [
    "Write a short operational event announcement.",
    "Keep it calm, actionable, and accessible.",
    `Type: ${safeContext.type}.`,
    `Location: ${safeContext.location}.`,
    `Details: ${safeContext.details}.`
  ].join(" ");

  const geminiAnnouncement = await generateGeminiResponse(prompt);
  if (geminiAnnouncement) {
    return {
      title: `${safeContext.type} update for ${safeContext.location}`,
      message: geminiAnnouncement,
      source: "gemini"
    };
  }

  return {
    title: `${safeContext.type} update for ${safeContext.location}`,
    message: `Please note a ${safeContext.type.toLowerCase()} affecting ${safeContext.location}. ${safeContext.details} Volunteers and help desks have been informed.`,
    source: "fallback"
  };
}

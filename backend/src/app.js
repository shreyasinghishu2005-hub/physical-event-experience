import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import safetyRoutes from "./routes/safetyRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import networkingRoutes from "./routes/networkingRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import gamificationRoutes from "./routes/gamificationRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp({ nextHandler } = {}) {
  const app = express();

  app.disable("x-powered-by");
  app.use((request, response, next) => {
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("X-Frame-Options", "DENY");
    response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    response.setHeader("Permissions-Policy", "microphone=(self), camera=()");
    next();
  });
  app.use(
    cors({
      origin: env.corsOrigin ? env.corsOrigin.split(",").map((origin) => origin.trim()) : true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  );
  app.use(express.json({ limit: "200kb" }));

  app.get("/api/health", (request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/event", eventRoutes);
  app.use("/api/ai", aiRoutes);
  app.use("/api/notifications", notificationRoutes);
  app.use("/api/safety", safetyRoutes);
  app.use("/api/volunteers", volunteerRoutes);
  app.use("/api/networking", networkingRoutes);
  app.use("/api/feedback", feedbackRoutes);
  app.use("/api/gamification", gamificationRoutes);
  app.use("/api/*", (request, response) => {
    response.status(404).json({ message: "API route not found." });
  });

  app.use(errorHandler);

  if (nextHandler) {
    app.all("*", (request, response) => nextHandler(request, response));
  } else {
    app.get("/", (request, response) => {
      response.json({ message: "Frontend handler not attached in API test mode." });
    });
  }

  return app;
}

import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import next from "next";
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

const dev = process.env.NODE_ENV !== "production";
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(currentDir, "../../frontend");
const nextApp = next({ dev, dir: frontendDir });
const nextHandler = nextApp.getRequestHandler();

async function startServer() {
  await nextApp.prepare();

  const app = express();

  app.use(cors());
  app.use(express.json());

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
  app.all("*", (request, response) => nextHandler(request, response));

  app.listen(env.port, "0.0.0.0", () => {
    console.log(`App running on http://0.0.0.0:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});

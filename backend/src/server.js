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

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Backend running on http://localhost:${env.port}`);
});
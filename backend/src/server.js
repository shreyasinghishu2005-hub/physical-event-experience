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

app.get("/", (request, response) => {
  response.type("html").send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Physical Event Experience API</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f6f8fb;
            color: #18212f;
          }
          main {
            max-width: 760px;
            margin: 64px auto;
            padding: 32px 24px;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
          }
          h1 {
            margin-top: 0;
            font-size: 2rem;
          }
          p, li {
            line-height: 1.6;
          }
          code, a {
            color: #0b63ce;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>Physical Event Experience API</h1>
          <p>This Render service is running the backend API, so the app UI is not served from this URL.</p>
          <p>Useful endpoints:</p>
          <ul>
            <li><a href="/api/health">/api/health</a></li>
            <li><code>/api/event/dashboard/:userId</code></li>
            <li><code>/api/event/sessions</code></li>
          </ul>
          <p>Deploy the Next.js frontend separately on Render and point <code>NEXT_PUBLIC_API_URL</code> to this backend.</p>
        </main>
      </body>
    </html>
  `);
});

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

import path from "node:path";
import { fileURLToPath } from "node:url";
import next from "next";
import { createApp } from "./app.js";
import { env } from "./config/env.js";

const dev = process.env.NODE_ENV !== "production";
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(currentDir, "../../frontend");
const nextApp = next({ dev, dir: frontendDir });
const nextHandler = nextApp.getRequestHandler();

async function startServer() {
  await nextApp.prepare();
  const app = createApp({ nextHandler });

  app.listen(env.port, "0.0.0.0", () => {
    console.log(`App running on http://0.0.0.0:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(currentDir, "../..");
const frontendDir = path.resolve(backendDir, "../frontend");
const buildIdPath = path.join(frontendDir, ".next", "BUILD_ID");

if (process.env.NODE_ENV !== "production") {
  process.exit(0);
}

if (fs.existsSync(buildIdPath)) {
  console.log("Production frontend build found.");
  process.exit(0);
}

console.log("Production frontend build missing. Running frontend build before start...");
execSync("npm install", {
  cwd: frontendDir,
  stdio: "inherit"
});
execSync("npm run build", {
  cwd: frontendDir,
  stdio: "inherit"
});

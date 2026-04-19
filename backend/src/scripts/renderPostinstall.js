import { execSync } from "node:child_process";

const isRender = process.env.RENDER === "true";

if (!isRender) {
  console.log("Skipping frontend build during local install.");
  process.exit(0);
}

console.log("Render install detected. Building frontend during postinstall...");
execSync("npm run build", {
  cwd: process.cwd(),
  stdio: "inherit"
});

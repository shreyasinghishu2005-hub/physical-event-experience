const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60000,
  use: {
    baseURL: "http://127.0.0.1:5000",
    headless: true
  },
  webServer: {
    command: "npm --prefix backend start",
    url: "http://127.0.0.1:5000/api/health",
    timeout: 120000,
    reuseExistingServer: true
  }
});

const { test, expect } = require("@playwright/test");

test("user can enter the dashboard and see role-aware event intelligence", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Sign in to your event experience" })).toBeVisible();

  await page.getByLabel("Name").fill("Aditi Sharma");
  await page.getByLabel("Email").fill("aditi@example.com");
  await page.getByLabel("Role").selectOption("volunteer");

  const operationsInterest = page.getByLabel("operations");
  if (!(await operationsInterest.isChecked())) {
    await operationsInterest.check();
  }

  const safetyInterest = page.getByLabel("safety");
  if (!(await safetyInterest.isChecked())) {
    await safetyInterest.check();
  }

  await page.getByRole("button", { name: "Enter Dashboard" }).click();

  await expect(page.getByRole("heading", { name: "FutureFest 2026" })).toBeVisible();
  await expect(page.locator(".role-chip")).toHaveText("volunteer");
  await expect(page.getByRole("heading", { name: "Smart Schedule" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI Recommendations" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Smart Navigation" })).toBeVisible();
});

test("chat assistant answers a runtime query from the dashboard", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Enter Dashboard" }).click();

  const questionBox = page.getByRole("textbox");
  await questionBox.fill("Is Hall A crowded right now?");
  await page.getByRole("button", { name: "Ask Assistant" }).click();

  await expect(page.locator(".assistant-reply")).toContainText(/Hall A|crowd/i);
});

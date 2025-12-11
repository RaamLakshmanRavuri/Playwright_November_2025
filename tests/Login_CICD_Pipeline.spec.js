import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test('Home Page Title', async ({ page }) => {

  await allure.step('Navigate to Login Page', async () => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.waitForTimeout(2000);
    await allure.attachment('Login Page', await page.screenshot(), 'image/png');
  });

  await allure.step('Validate Page Title & URL', async () => {
    await expect(page).toHaveTitle('OrangeHRM');
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await allure.attachment('Title/URL Screenshot', await page.screenshot(), 'image/png');
  });

  await allure.step('Fetch username and password hints', async () => {
    const userText = page.locator("//p[contains(normalize-space(),'Admin')]");
    const password = page.locator("//p[contains(normalize-space(),'admin')]");

    console.log("User Text:", await userText.textContent());
    console.log("Password Text:", await password.textContent());

    await allure.attachment('Credentials Screenshot', await page.screenshot(), 'image/png');
  });

  let label, value, passkey, passValue;

  await allure.step('Extract username & password values', async () => {
    const userText = await page.locator("//p[contains(normalize-space(),'Admin')]").textContent();
    [label, value] = userText.split(':');

    const passwordText = await page.locator("//p[contains(normalize-space(),'admin')]").textContent();
    [passkey, passValue] = passwordText.split(':');

    console.log(label.trim(), value.trim());
    console.log(passkey.trim(), passValue.trim());

    await allure.attachment('Extracted Values', Buffer.from(`
      USER: ${value.trim()}
      PASS: ${passValue.trim()}
    `), 'text/plain');
  });

  await allure.step('Enter username and password', async () => {
    await page.locator("input[name='username']").fill(value.trim());
    await page.locator("input[name='password']").fill(passValue.trim());
    await allure.attachment('Filled Login Form', await page.screenshot(), 'image/png');
  });

  await allure.step('Click Login Button', async () => {
    await page.locator("button[type='submit']").click();
    await page.waitForTimeout(3000);
    await allure.attachment('After Login Screenshot', await page.screenshot(), 'image/png');
  });

  await allure.step('Verify Dashboard Visible', async () => {
    await expect.soft(page.locator("//h6[text()='Dashboard']")).toHaveText("Dashboard");
    await allure.attachment('Dashboard Screenshot', await page.screenshot(), 'image/png');
  });

});

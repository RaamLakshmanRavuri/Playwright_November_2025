// import { test, expect } from '@playwright/test';
// import { allure } from 'allure-playwright';

// test('Home Page Title', async ({ page }) => {

//   await allure.step('Navigate to Login Page', async () => {
//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//     await page.waitForTimeout(2000);
//     await allure.attachment('Login Page', await page.screenshot(), 'image/png');
//   });

//   await allure.step('Validate Page Title & URL', async () => {
//     await expect(page).toHaveTitle('OrangeHRM');
//     await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//     await allure.attachment('Title/URL Screenshot', await page.screenshot(), 'image/png');
//   });

//   await allure.step('Fetch username and password hints', async () => {
//     const userText = page.locator("//p[contains(normalize-space(),'Admin')]");
//     const password = page.locator("//p[contains(normalize-space(),'admin')]");

//     console.log("User Text:", await userText.textContent());
//     console.log("Password Text:", await password.textContent());

//     await allure.attachment('Credentials Screenshot', await page.screenshot(), 'image/png');
//   });

//   let label, value, passkey, passValue;

//   await allure.step('Extract username & password values', async () => {
//     const userText = await page.locator("//p[contains(normalize-space(),'Admin')]").textContent();
//     [label, value] = userText.split(':');

//     const passwordText = await page.locator("//p[contains(normalize-space(),'admin')]").textContent();
//     [passkey, passValue] = passwordText.split(':');

//     console.log(label.trim(), value.trim());
//     console.log(passkey.trim(), passValue.trim());

//     await allure.attachment('Extracted Values', Buffer.from(`
//       USER: ${value.trim()}
//       PASS: ${passValue.trim()}
//     `), 'text/plain');
//   });

//   await allure.step('Enter username and password', async () => {
//     await page.locator("input[name='username']").fill(value.trim());
//     await page.locator("input[name='password']").fill(passValue.trim());
//     await allure.attachment('Filled Login Form', await page.screenshot(), 'image/png');
//   });

//   await allure.step('Click Login Button', async () => {
//     await page.locator("button[type='submit']").click();
//     await page.waitForTimeout(3000);
//     await allure.attachment('After Login Screenshot', await page.screenshot(), 'image/png');
//   });

//   await allure.step('Verify Dashboard Visible', async () => {
//     await expect.soft(page.locator("//h6[text()='Dashboard']")).toHaveText("Dashboard");
//     await allure.attachment('Dashboard Screenshot', await page.screenshot(), 'image/png');
//   });

// });



// import { test, expect } from '@playwright/test';
// import { allure } from "allure-playwright";

// // Highlight helpers
// async function highlightYellow(page, locator) {
//   await page.evaluate((el) => {
//     el.style.border = "3px solid yellow";
//     el.style.backgroundColor = "rgba(255,255,0,0.2)";
//   }, await locator.elementHandle());
// }

// async function highlightRed(page, locator) {
//   await page.evaluate((el) => {
//     el.style.border = "3px solid red";
//     el.style.backgroundColor = "rgba(255,0,0,0.2)";
//   }, await locator.elementHandle());
// }

// test('Home Page Title', async ({ page }) => {

//   await allure.step("Open Login Page", async () => {
//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//     await page.waitForTimeout(2000);
//     await allure.attachment("Login Page", await page.screenshot(), "image/png");
//   });

//   await allure.step("Validate Page Title & URL", async () => {
//     await expect(page).toHaveTitle('OrangeHRM');
//     await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//   });

//   const userText = page.locator("//p[contains(normalize-space(),'Admin')]");
//   const password = page.locator("//p[contains(normalize-space(),'admin')]");

//   await allure.step("Extract Username & Password", async () => {
//     await highlightYellow(page, userText);
//     await highlightYellow(page, password);

//     const userContent = await userText.textContent();
//     const passContent = await password.textContent();

//     const [, username] = userContent.split(':');
//     const [, passValue] = passContent.split(':');

//     await allure.attachment("Highlighted Credentials", await page.screenshot(), "image/png");

//     const userField = await page.locator("input[name='username']");
//     await userField.fill(username.trim());
   
//     const passField = await page.locator("input[name='password']");
//     await passField.fill(passValue.trim());
    
//     await highlightRed(page, userField);
//     await highlightRed(page, passField);
//     await allure.attachment("Filled Login Form", await page.screenshot(), "image/png");
//   });

//   await allure.step("Click Login Button", async () => {
//     const loginButton = page.locator("button[type='submit']");
//     await highlightYellow(page, loginButton);
//     await allure.attachment("Before Login Click", await page.screenshot(), "image/png");
//     await loginButton.click();
//   });

//   await allure.step("Verify Dashboard", async () => {
//     const dashboard = page.locator("//h6[text()='Dashboard']");
//     await page.waitForTimeout(3000);
//     await highlightRed(page, dashboard);
//     await allure.attachment("Dashboard Page", await page.screenshot(), "image/png");

//     await expect.soft(dashboard).toHaveText("Dashboard");
//   });

// });



import { test, expect } from '@playwright/test';
import { step, attachScreenshot, highlightWithShot, fillInput } from '../utility/allureUtils.js';

test("Home Page Title", async ({ page }) => {

  await step("Open Login Page", async () => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await attachScreenshot("Login Page", page);
  });

  await step("Validate Page Details", async () => {
    await expect(page).toHaveTitle("OrangeHRM");
    await expect(page).toHaveURL(/auth\/login/);
  });

  await step("Extract Username & Password", async () => {
    const userText = page.locator("//p[contains(normalize-space(),'Admin')]");
    const password = page.locator("//p[contains(normalize-space(),'admin')]");

    await highlightWithShot(page, userText, "Highlighted Username");
    await highlightWithShot(page, password, "Highlighted Password");

    const username = (await userText.textContent()).split(":")[1].trim();
    const passValue = (await password.textContent()).split(":")[1].trim();

    await fillInput(page, page.locator("input[name='username']"), username, "Username Field");
    await fillInput(page, page.locator("input[name='password']"), passValue, "Password Field");
  });

  await step("Click Login Button", async () => {
    const loginButton = page.locator("button[type='submit']");
    await highlightWithShot(page, loginButton, "Before Login Click");
    await loginButton.click();
  });

  await step("Verify Dashboard", async () => {
    const dashboard = page.locator("//h6[text()='Dashboard']");
    await dashboard.waitFor({ state: "visible" });
    await highlightWithShot(page, dashboard, "Dashboard Page", "red");
    await expect.soft(dashboard).toHaveText("Dashboard");
  });

});

import { allure } from "allure-playwright";

// Generic Step Wrapper
export async function step(name, fn) {
  return await allure.step(name, fn);
}

// Screenshot Attachment
export async function attachScreenshot(name, page) {
  await allure.attachment(
    name,
    await page.screenshot(),
    "image/png"
  );
}

// Highlight Helper (Yellow / Red)
export async function highlight(page, locator, color = "yellow") {
  const style =
    color === "yellow"
      ? "3px solid yellow; background-color: rgba(255,255,0,0.2);"
      : "3px solid red; background-color: rgba(255,0,0,0.2);";

  await locator.evaluate((el, styleText) => {
    el.style = styleText;
  }, style);
}

// Highlight + Screenshot
export async function highlightWithShot(page, locator, name, color = "yellow") {
  await highlight(page, locator, color);
  await attachScreenshot(name, page);
}

// Fill + Highlight + Screenshot
export async function fillInput(page, locator, value, fieldName) {
  await highlight(page, locator, "yellow");
  await locator.fill(value);
  await highlight(page, locator, "red");
  await attachScreenshot(`Filled - ${fieldName}`, page);
}

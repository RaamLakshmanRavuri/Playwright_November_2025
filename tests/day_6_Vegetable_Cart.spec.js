import {test, expect} from '@playwright/test';


test('Vegetable cart', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await page.waitForTimeout(5000);
    const searchBox = page.locator("input[type='search']");
    await searchBox.fill("Cauli");
    await page.waitForTimeout(5000);
    
    await page.type("input[type='search']", "flower");
    await page.waitForTimeout(5000);

});
import {test, expect} from '@playwright/test';


test('Print all Links', async({page})=>{
    await page.goto('https://demoblaze.com/');
    await page.waitForTimeout(5000);

    page.waitForSelector("#tbodyid div h4 a");
    const links = page.locator("#tbodyid div h4 a");
    const count = await links.count();
    console.log("Total Links:", count);

    for (let i = 0; i < count; i++) {
        const linkText = await links.nth(i).textContent();
        console.log(`Link ${i + 1}: Text = ${linkText}`);
    }
})
import { test, expect } from '@playwright/test';

test('Alerts handling with dynamic prompt verification', async ({ page }) => {

        await page.goto('https://testautomationpractice.blogspot.com/');

    // Handle Alert Box
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('I am an alert box!');
        console.log("Alert text:", dialog.message());
        await dialog.accept();
    });
        await page.click('#alertBtn');
        await page.waitForTimeout(1000);




    // Handle Confirm Box
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Press a button!');
        console.log("Confirm text:", dialog.message());
        await dialog.dismiss();
    });
        await page.click('#confirmBtn');
        await page.waitForTimeout(1000);





    // Handle Prompt Box with dynamic input
    const inputName = 'Raam Lakshman'; // Your dynamic value
    
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Please enter your name:');
        console.log("Prompt text:", dialog.message());
        await dialog.accept(inputName);
    });
        await page.click('#promptBtn');
    
    // Wait for the result dialog that shows your input
    page.once('dialog', async dialog => {
        const expectedMessage = await page.locator('#demo').textContent();
        expect(dialog.message()).toBe(expectedMessage.trim());
        await dialog.accept();
    });





    
        await page.waitForTimeout(1000);
        const expectedMessage = await page.locator('#demo').textContent();
        console.log("Result dialog text:", expectedMessage.trim());
});






test('Alerts handling', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  page.on('dialog', async dialog => {
      console.log("Alert says:", dialog.message());
      await dialog.accept();
  });

  await page.click('#alertbtn');     // simple alert
  await page.click('#confirmbtn');   // confirm alert

});

import {test, expect} from '@playwright/test';


test('Dropdown', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.waitForTimeout(5000);


//********************************CHECKBOXES******************************* */
// Select all checkboxes and verify their selection
await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
await page.waitForTimeout(5000);


const checkboxes = page.locator("//input[@type='checkbox']");
const count = await checkboxes.count();
console.log("Total Checkboxes:", count);


for (let i = 0; i < count; i++) {
await checkboxes.nth(i).check();

const isChecked = await checkboxes.nth(i).isChecked();
console.log(`Checkbox ${i + 1} is checked:`, isChecked);
}

// Select specific checkbox (3rd one)
const checkbox_3 = await page.locator("(//input[@type='checkbox'])[3]");
await checkbox_3.check();
await page.waitForTimeout(5000);








//********************************RADIOBUTTONS******************************* */
const radioButton = page.locator("//input[@type='radio']");
const radio_count = await radioButton.count();
console.log("Total Radio Buttons:", radio_count);

for (let i = 0; i < radio_count; i++) {
await radioButton.nth(i).check();
const isChecked = await radioButton.nth(i).isChecked();
console.log(`Radio Button ${i + 1} is checked:`, isChecked);
}
await page.waitForTimeout(5000);

// Select specific checkbox (3rd one)
const radioButton_2 = await page.locator("(//input[@type='radio'])[2]");
await radioButton_2.check();
await page.waitForTimeout(5000);
})
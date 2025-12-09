import {test, expect} from '@playwright/test';


test('Dropdown', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.waitForTimeout(5000);


//*******************************DROPDOWN********************************** */
const multi = page.locator("#dropdown-class-example");

// Select option
await multi.selectOption("option2");

// Print the selected value (text)
const selectedText = await multi.evaluate(el => el.options[el.selectedIndex].text);
console.log("Selected Option Text:", selectedText);

// Print the selected value (value attribute)
const selectedValue = await multi.evaluate(el => el.value);
console.log("Selected Option Value:", selectedValue);
await page.waitForTimeout(5000);


// Print all options from dropdown from Facebook Application
    test.setTimeout(60000);   // Increase timeout (recommended)
    await page.goto("https://www.facebook.com/");
    // Click "Create new account"
    await page.locator("text=Create new account").click();
    // Wait for popup to appear
    await page.waitForSelector("#month");
    // Print all month options
    const monthoptions = await page.$$eval("#month option", opts => opts.map(o => o.textContent.trim()));
    console.log("Months:", monthoptions);

    //OR
    const elements = await page.$$("#month option");
    for (const el of elements) {
    const text = await el.textContent();
    console.log(text.trim());
    }

    //OR
    const options = page.locator("#month option");
    const result = await options.allTextContents();
    console.log(result);


    //********************************MULTI-SELECT DROPDOWN******************************* */
    await page.goto("https://www.rizzui.com/docs/Inputs/multi-select");


    
    // ------ 1. Locate the FIRST multi-select dropdown ------
    const firstDropdown = page.locator("#headlessui-listbox-button-«r3» > span.rizzui-multi-select-value.flex.w-full.flex-wrap.items-center.gap-2.truncate.text-start.text-muted-foreground");
    // Open dropdown
    await firstDropdown.click();
    
    // ------ 2. Select Apple ------
    await page.getByRole("option", { name: "Apple 🍎" }).click();
    // Dropdown closes → open again
    // Select Orange
    await page.getByRole("option", { name: "Orange 🍊" }).click();
    await page.waitForTimeout(5000);
})
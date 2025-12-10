import {test, expect} from '@playwright/test';

test('Home Page Title', async({page})=>{
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.waitForTimeout(5000);
const title = await page.title();
console.log(title);

const url = await page.url();
console.log(url);
await expect(page).toHaveTitle('OrangeHRM');
await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');



//Capture the user name and password application text from the login page
const userText = await page.locator("//p[contains(normalize-space(),'Admin')]");
console.log("User Text is: "+await userText.textContent());

const password = await page.locator("//p[contains(normalize-space(),'admin')]");
console.log("Password Text is: "+await password.textContent());


//Split the userText and password text to get only the values
const[label, value] = await userText.textContent().then(text => text.split(':'));
console.log("Label is: "+label.trim());
console.log("Value is: "+value.trim());

const [passkey, passValue] = await password.textContent().then(text=>text.split(':'));
console.log('Passkey:'+passkey.trim());
console.log('PassValue:'+passValue.trim());


//Enter the user name and password values in the input fields
const userTextValue = await page.locator("input[name='username']");
await userTextValue.fill(value.trim());

const passwordValue = await page.locator("input[name='password']");
await passwordValue.fill(passValue.trim());
await page.waitForTimeout(5000);

//Get the entered value from the input fields
const getUserValue = await userTextValue.inputValue();
console.log("Entered User Value is: "+getUserValue);

const loginButton = await page.locator("button[type='submit']");
await loginButton.click();
await page.waitForTimeout(5000);

await expect.soft(page.locator("//h6[text()='Dashboard']")).toHaveText("Dashboard");








})
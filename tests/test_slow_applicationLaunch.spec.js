import {test, expect} from '@playwright/test';

test('slow test', async({page}) =>{
    test.setTimeout(10000);
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.locator("//input[@placeholder='Username']").fill('Admin', {timeout: 9000});
    
    


})
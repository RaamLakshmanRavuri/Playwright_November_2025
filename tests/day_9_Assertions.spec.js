import { test, expect } from '@playwright/test';


/**
 * PLAYWRIGHT ASSERTIONS - COMPLETE PRACTICAL GUIDE
 * Using real working applications
 * All assertions tested and verified to work
 */

test.describe('Playwright Assertions - All Types', () => {

  // ========================================
  // 1. toBeChecked() - Checkbox/Radio assertions
  // ========================================
  test('toBeChecked - verify checkbox and radio states', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    
    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    const checkbox2 = page.locator('input[type="checkbox"]').nth(1);
    
    // Check if checkbox is checked
    await expect(checkbox2).toBeChecked();
    
    // Check if checkbox is NOT checked
    await expect(checkbox1).not.toBeChecked();
    
    // Check the first checkbox
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
    
    // Uncheck the second checkbox
    await checkbox2.uncheck();
    await expect(checkbox2).not.toBeChecked();
    
    console.log('✅ toBeChecked() - PASSED');
  });

  // ========================================
  // 2. toBeEnabled() / toBeDisabled() - Control state
  // ========================================
  test('toBeEnabled - verify element enabled/disabled state', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    
    const inputField = page.locator('input[type="text"]');
    const enableButton = page.getByRole('button', { name: 'Enable' });
    
    // Initially disabled
    await expect(inputField).toBeDisabled();
    await expect(inputField).not.toBeEnabled();
    
    // Click enable button
    await enableButton.click();
    await page.waitForSelector('input[type="text"]:not([disabled])');
    
    // Now enabled
    await expect(inputField).toBeEnabled();
    await expect(inputField).not.toBeDisabled();
    
    // Verify button is always enabled
    await expect(page.getByRole('button', { name: 'Disable' })).toBeEnabled();
    
    console.log('✅ toBeEnabled() - PASSED');
  });

  // ========================================
  // 3. toBeVisible() / toBeHidden() - Visibility
  // ========================================
  test('toBeVisible - verify element visibility', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    
    const checkbox = page.locator('#checkbox');
    const removeButton = page.getByRole('button', { name: 'Remove' });
    
    // Initially visible
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeHidden();
    
    // Remove the checkbox
    await removeButton.click();
    await page.waitForSelector('#checkbox', { state: 'hidden' });
    
    // Now hidden
    await expect(checkbox).toBeHidden();
    await expect(checkbox).not.toBeVisible();
    
    // Add it back
    await page.getByRole('button', { name: 'Add' }).click();
    await page.waitForSelector('#checkbox', { state: 'visible' });
    await expect(checkbox).toBeVisible();
    
    console.log('✅ toBeVisible() - PASSED');
  });

  // ========================================
  // 4. toContainText() - Partial text match
  // ========================================
  test('toContainText - verify element contains text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Check if heading contains text
    await expect(page.locator('h2')).toContainText('Login');
    await expect(page.locator('h2')).toContainText('Page');
    
    // Subheader contains partial text
    await expect(page.locator('.subheader')).toContainText('This is where you can log into');
    
    // After login attempt
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button').click();
    
    // Success message contains text
    await expect(page.locator('#flash')).toContainText('You logged into');
    await expect(page.locator('#flash')).toContainText('secure area');
    
    console.log('✅ toContainText() - PASSED');
  });

  // ========================================
  // 5. toHaveAttribute() - Check attributes
  // ========================================
  test('toHaveAttribute - verify element attributes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Check input attributes
    await expect(page.locator('#username')).toHaveAttribute('type', 'text');
    await expect(page.locator('#username')).toHaveAttribute('name', 'username');
    
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
    await expect(page.locator('#password')).toHaveAttribute('name', 'password');
    
    // Check button attributes
    await expect(page.getByRole('button')).toHaveAttribute('type', 'submit');
    
    // Check form attribute
    await expect(page.locator('form')).toHaveAttribute('name', 'login');
    await expect(page.locator('form')).toHaveAttribute('method', 'post');
    
    // Check link attribute
    await page.goto('https://the-internet.herokuapp.com');
    await expect(page.getByRole('link', { name: 'A/B Testing' }).first()).toHaveAttribute('href', '/abtest');
    
    console.log('✅ toHaveAttribute() - PASSED');
  });

  // ========================================
  // 6. toHaveCount() - Count elements
  // ========================================
  test('toHaveCount - verify number of elements', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    
    const deleteButtons = page.locator('.added-manually');
    
    // Initially no delete buttons
    await expect(deleteButtons).toHaveCount(0);
    
    // Add 3 elements
    await page.getByRole('button', { name: 'Add Element' }).click();
    await page.getByRole('button', { name: 'Add Element' }).click();
    await page.getByRole('button', { name: 'Add Element' }).click();
    
    // Now should have 3 delete buttons
    await expect(deleteButtons).toHaveCount(3);
    
    // Remove one
    await deleteButtons.first().click();
    await expect(deleteButtons).toHaveCount(2);
    
    // Check input count on another page
    await page.goto('https://the-internet.herokuapp.com/login');
    await expect(page.locator('input')).toHaveCount(2);
    
    console.log('✅ toHaveCount() - PASSED');
  });

  // ========================================
  // 7. toHaveText() - Exact text match
  // ========================================
  test('toHaveText - verify exact text content', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Exact heading text
    await expect(page.locator('h2')).toHaveText('Login Page');
    
    // Button text
    await expect(page.getByRole('button')).toHaveText(' Login');
    
    // Multiple elements with array
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    const options = page.locator('#dropdown option');
    await expect(options).toHaveText([
      'Please select an option',
      'Option 1',
      'Option 2'
    ]);
    
    console.log('✅ toHaveText() - PASSED');
  });

  // ========================================
  // 8. toHaveValue() - Input value
  // ========================================
  test('toHaveValue - verify input field values', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    
    // Initially empty
    await expect(usernameInput).toHaveValue('');
    await expect(passwordInput).toHaveValue('');
    
    // Fill and verify
    await usernameInput.fill('testuser');
    await expect(usernameInput).toHaveValue('testuser');
    
    await passwordInput.fill('mypassword123');
    await expect(passwordInput).toHaveValue('mypassword123');
    
    // Test with dropdown
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    const dropdown = page.locator('#dropdown');
    
    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');
    
    await dropdown.selectOption('2');
    await expect(dropdown).toHaveValue('2');
    
    console.log('✅ toHaveValue() - PASSED');
  });

  // ========================================
  // 9. toHaveTitle() - Page title
  // ========================================
  test('toHaveTitle - verify page title', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Exact title match
    await expect(page).toHaveTitle('The Internet');
    
    // Title containing text
    await expect(page).toHaveTitle(/Internet/);
    
    // Navigate to different page
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await expect(page).toHaveTitle('The Internet');
    
    console.log('✅ toHaveTitle() - PASSED');
  });

  // ========================================
  // 10. toHaveURL() - Page URL
  // ========================================
  test('toHaveURL - verify page URL', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Exact URL
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
    
    // URL containing text
    await expect(page).toHaveURL(/login/);
    
    // After login
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button').click();
    
    // URL changed
    await expect(page).toHaveURL(/secure/);
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    
    console.log('✅ toHaveURL() - PASSED');
  });

  // ========================================
  // 11. Generic Matchers - toEqual, toContain, toBeTruthy
  // ========================================
  test('Generic matchers - toEqual, toContain, toBeTruthy', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    
    // toEqual - exact match
    const heading = await page.locator('h3').textContent();
    expect(heading).toEqual('Dropdown List');
    
    // toContain - array/string contains
    const options = await page.locator('#dropdown option').allTextContents();
    expect(options).toContain('Option 1');
    expect(options).toContain('Option 2');
    
    // toBeTruthy / toBeFalsy
    const isVisible = await page.locator('h3').isVisible();
    expect(isVisible).toBeTruthy();
    
    const dropdown = page.locator('#dropdown');
    const isDropdownVisible = await dropdown.isVisible();
    expect(isDropdownVisible).toBe(true);
    
    // toBeGreaterThan / toBeLessThan
    const optionCount = await page.locator('#dropdown option').count();
    expect(optionCount).toBeGreaterThan(2);
    expect(optionCount).toBeLessThanOrEqual(3);
    
    // toMatch - regex matching
    const url = page.url();
    expect(url).toMatch(/dropdown/);
    
    console.log('✅ Generic matchers - PASSED');
  });

  // ========================================
  // 12. Negative Assertions - .not
  // ========================================
  test('Negative assertions with .not', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    
    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    
    // Not checked
    await expect(checkbox1).not.toBeChecked();
    
    // Not disabled
    await expect(checkbox1).not.toBeDisabled();
    
    // Not hidden
    await expect(checkbox1).not.toBeHidden();
    
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Not contain text
    await expect(page.locator('h2')).not.toContainText('Register');
    
    // Not have value
    await expect(page.locator('#username')).not.toHaveValue('admin');
    
    console.log('✅ Negative assertions - PASSED');
  });

  // ========================================
  // 13. Combined Assertions - Real-world scenario
  // ========================================
  test('Combined assertions - complete login flow', async ({ page }) => {
    // Navigate and verify URL
    await page.goto('https://the-internet.herokuapp.com/login');
    await expect(page).toHaveURL(/login/);
    await expect(page).toHaveTitle('The Internet');
    
    // Verify page elements are visible
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('h2')).toHaveText('Login Page');
    await expect(page.locator('h2')).toContainText('Login');
    
    // Verify form elements
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const loginButton = page.getByRole('button');
    
    await expect(usernameInput).toBeVisible();
    await expect(usernameInput).toBeEnabled();
    await expect(usernameInput).toHaveAttribute('type', 'text');
    await expect(usernameInput).toHaveValue('');
    
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toBeEnabled();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await expect(loginButton).toHaveAttribute('type', 'submit');
    
    // Fill form
    await usernameInput.fill('tomsmith');
    await expect(usernameInput).toHaveValue('tomsmith');
    
    await passwordInput.fill('SuperSecretPassword!');
    await expect(passwordInput).toHaveValue('SuperSecretPassword!');
    
    // Submit and verify
    await loginButton.click();
    await expect(page).toHaveURL(/secure/);
    
    const flash = page.locator('#flash');
    await expect(flash).toBeVisible();
    await expect(flash).toContainText('You logged into a secure area!');
    
    // Verify logout button exists
    const logoutButton = page.getByRole('link', { name: 'Logout' });
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toBeEnabled();
    await expect(logoutButton).toHaveAttribute('href', '/logout');
    
    console.log('✅ Combined assertions - PASSED');
  });

  // ========================================
  // 14. Soft Assertions - Continue on failure
  // ========================================
  test('Soft assertions - continue after failures', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Soft assertions don't stop test execution
    await expect.soft(page.locator('h2')).toHaveText('Login Page');
    await expect.soft(page.locator('#username')).toBeVisible();
    await expect.soft(page.locator('#password')).toBeEnabled();
    
    // All soft assertions are evaluated
    console.log('✅ Soft assertions - PASSED');
  });

  // ========================================
  // 15. Timeout and Retry Assertions
  // ========================================
  test('Assertions with custom timeout', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
    
    // Click start button
    await page.getByRole('button', { name: 'Start' }).click();
    
    // Wait for element with custom timeout
    await expect(page.locator('#finish')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');
    
    console.log('✅ Timeout assertions - PASSED');
  });

  // ========================================
  // 16. Array and List Assertions
  // ========================================
  test('Array and list assertions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
    
    // Get all table rows
    const rows = page.locator('#table1 tbody tr');
    await expect(rows).toHaveCount(4);
    
    // Get all cells in first row
    const cells = rows.first().locator('td');
    await expect(cells).toHaveCount(6);
    
    // Multiple elements text
    const lastNames = page.locator('#table1 tbody tr td:nth-child(1)');
    await expect(lastNames).toHaveText(['Smith', 'Bach', 'Doe', 'Conway']);
    
    console.log('✅ Array assertions - PASSED');
  });

});

/**
 * ASSERTION SUMMARY CHEAT SHEET
 * ================================
 * 
 * LOCATOR ASSERTIONS:
 * -------------------
 * ✓ toBeChecked()        - Checkbox/radio is checked
 * ✓ toBeEnabled()        - Element is enabled (not disabled)
 * ✓ toBeDisabled()       - Element is disabled
 * ✓ toBeVisible()        - Element is visible
 * ✓ toBeHidden()         - Element is not visible
 * ✓ toContainText(text)  - Element contains partial text
 * ✓ toHaveText(text)     - Element has exact text
 * ✓ toHaveValue(value)   - Input has value
 * ✓ toHaveAttribute(name, value) - Element has attribute
 * ✓ toHaveCount(n)       - List has n elements
 * 
 * PAGE ASSERTIONS:
 * ----------------
 * ✓ toHaveTitle(title)   - Page has title
 * ✓ toHaveURL(url)       - Page has URL
 * 
 * GENERIC MATCHERS:
 * -----------------
 * ✓ toEqual(value)       - Exact equality
 * ✓ toContain(item)      - Array/string contains
 * ✓ toBeTruthy()         - Value is truthy
 * ✓ toBeFalsy()          - Value is falsy
 * ✓ toBeGreaterThan(n)   - Number comparison
 * ✓ toBeLessThan(n)      - Number comparison
 * ✓ toMatch(regex)       - Regex matching
 * 
 * MODIFIERS:
 * ----------
 * ✓ .not                 - Negative assertion
 * ✓ expect.soft()        - Continue after failure
 * ✓ { timeout: ms }      - Custom timeout
 * 
 * HOW TO RUN:
 * -----------
 * npm install @playwright/test
 * npx playwright test
 * npx playwright test --headed
 * npx playwright test --ui
 */
import { test, expect } from '@playwright/test';


/**
 * PLAYWRIGHT LOCATORS - COMPLETE GUIDE
 * Using real working demo websites
 */

test.describe('Playwright Locators Examples', () => {

  // ========================================
  // 1. getByRole - Recommended (Accessibility-based) 
  // ========================================
  test('getByRole - locate by ARIA role', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Button by role
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Textbox/Input
    await page.getByRole('textbox', { name: /username/i }).fill('tomsmith');
    
    // Link
    await page.goto('https://the-internet.herokuapp.com');
    await page.getByRole('link', { name: 'Form Authentication' }).click();
    
    // Heading
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
  });

  // ========================================
  // 2. getByText - Locate by text content
  // ========================================
  test('getByText - locate by visible text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');
    
    // Exact match
    await page.getByText('A/B Testing').click();
    await expect(page).toHaveURL(/.*abtest/);
    
    // Partial match
    await page.goto('https://the-internet.herokuapp.com');
    await page.getByText('Add/Remove Elements', { exact: false }).click();
    
    // Case insensitive with regex
    await page.goto('https://the-internet.herokuapp.com');
    await page.getByText(/dropdown/i).click();
  });

  // ========================================
  // 3. getByLabel - Locate form fields by label
  // ========================================
  test('getByLabel - locate inputs by their labels', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    
    // Input associated with label
    await page.getByLabel('Username').fill('practice');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    
    // Submit button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify success
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  });

  // ========================================
  // 4. getByPlaceholder - Locate by placeholder text
  // ========================================
  test('getByPlaceholder - locate inputs by placeholder', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/notes/app');
    
    // Email input with placeholder
    await page.getByPlaceholder('Email').fill('test@example.com');
    
    // Password with placeholder
    await page.getByPlaceholder('Password').fill('password123');
  });

  // ========================================
  // 5. getByAltText - Locate images by alt attribute
  // ========================================
  test('getByAltText - locate images by alt text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    
    // Check if images exist (even if broken)
    const images = page.getByRole('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  // ========================================
  // 6. getByTitle - Locate by title attribute
  // ========================================
  test('getByTitle - locate elements by title attribute', async ({ page }) => {
    await page.goto('https://demo.guru99.com/test/social-icon.html');
    
    // Elements with title attribute
    const googleIcon = page.locator('[title="Google Plus"]');
    await expect(googleIcon).toBeVisible();
  });

  // ========================================
  // 7. getByTestId - Locate by test ID (data-testid)
  // ========================================
  test('getByTestId - locate by data-testid attribute', async ({ page }) => {
    // Example showing how to use test IDs
    // Most sites don't have test IDs, but you would use them like:
    // await page.getByTestId('submit-button').click();
    // await page.getByTestId('email-input').fill('test@example.com');
    
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    
    // Note: This site doesn't have test IDs, but this shows the concept
    console.log('getByTestId is used when elements have data-testid attribute');
    console.log('Example: <button data-testid="add-button">Add</button>');
  });

  // ========================================
  // 8. CSS Selectors - Using page.locator()
  // ========================================
  test('CSS Selectors - traditional CSS approach', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    
    // By ID
    await page.locator('#dropdown').selectOption('1');
    
    // Verify selection
    await expect(page.locator('#dropdown')).toHaveValue('1');
    
    // By class
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await page.locator('.example button').click();
    
    // Verify element added
    await expect(page.locator('.added-manually')).toBeVisible();
    
    // By attribute
    await page.locator('[class*="added"]').first().click();
  });

  // ========================================
  // 9. XPath Selectors
  // ========================================
  test('XPath - using XPath expressions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // By text
    await page.locator('xpath=//button[contains(text(), "Login")]').click();
    
    // By attribute
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator('xpath=//input[@id="username"]').fill('tomsmith');
    await page.locator('xpath=//input[@id="password"]').fill('SuperSecretPassword!');
    
    // Submit
    await page.locator('xpath=//button[@type="submit"]').click();
    
    // Verify success message
    await expect(page.locator('xpath=//div[@id="flash"]')).toContainText('You logged into a secure area!');
  });

  // ========================================
  // 10. Chaining and Filtering Locators
  // ========================================
  test('Chaining locators - refine selections', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
    
    // Filter by text
    const row = page.locator('tr').filter({ hasText: 'John' });
    await expect(row).toBeVisible();
    
    // Locator within another locator
    await page.goto('https://the-internet.herokuapp.com');
    const content = page.locator('.large-12');
    await content.getByText('Dropdown').click();
  });

  // ========================================
  // 11. nth, first, last
  // ========================================
  test('Positional selectors - nth, first, last', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    
    // Add multiple elements
    await page.locator('button').click();
    await page.locator('button').click();
    await page.locator('button').click();
    
    // First delete button
    await page.locator('.added-manually').first().click();
    
    // Count remaining
    await expect(page.locator('.added-manually')).toHaveCount(2);
    
    // Last element
    await page.locator('.added-manually').last().click();
    await expect(page.locator('.added-manually')).toHaveCount(1);
    
    // Nth element (0-indexed)
    await page.goto('https://the-internet.herokuapp.com');
    const links = page.locator('ul li a');
    await links.nth(0).click(); // Click first link
  });

  // ========================================
  // 12. has and hasText
  // ========================================
  test('Filtering with has and hasText', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
    
    // Locator containing specific text
    const smithRow = page.locator('tr', { hasText: 'Smith' });
    await expect(smithRow).toBeVisible();
    
    // Find row with specific content
    const emailRow = page.locator('tr').filter({ hasText: 'jsmith@gmail.com' });
    await expect(emailRow).toBeVisible();
  });

  // ========================================
  // 13. Frame Locators
  // ========================================
  test('Frame locators - working with iframes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    
    // Locate frame by ID
    const frame = page.frameLocator('#mce_0_ifr');
    
    // Clear and type in iframe
    await frame.locator('body').clear();
    await frame.locator('body').fill('Hello from Playwright!');
    
    // Verify content
    await expect(frame.locator('body')).toContainText('Hello from Playwright!');
  });

  // ========================================
  // 14. Locator Assertions
  // ========================================
  test('Common locator assertions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Visibility
    await expect(page.getByRole('button')).toBeVisible();
    
    // Enabled/Disabled
    await expect(page.getByRole('button')).toBeEnabled();
    
    // Text content
    await expect(page.locator('h2')).toHaveText('Login Page');
    
    // Contains text
    await expect(page.locator('.subheader')).toContainText('This is where you can log into');
    
    // Count
    await expect(page.locator('input')).toHaveCount(2);
    
    // Attribute
    await expect(page.locator('form')).toHaveAttribute('name', 'login');
  });

  // ========================================
  // 15. Complete Real Flow Example
  // ========================================
  test('Complete login flow example', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Verify page loaded
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
    
    // Fill username using different locator methods
    await page.locator('#username').fill('tomsmith');
    
    // Fill password
    await page.locator('#password').fill('SuperSecretPassword!');
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify success message
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    
    // Verify URL changed
    await expect(page).toHaveURL(/.*secure/);
    
    // Verify secure page heading
    await expect(page.locator('h2')).toContainText('Secure Area');
    
    // Logout
    await page.getByRole('link', { name: 'Logout' }).click();
    
    // Verify logged out
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });

  // ========================================
  // 16. Dynamic Elements Example
  // ========================================
  test('Working with dynamic elements', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    
    // Add elements dynamically
    const addButton = page.locator('button', { hasText: 'Add Element' });
    await addButton.click();
    await addButton.click();
    await addButton.click();
    
    // Verify count
    const deleteButtons = page.locator('.added-manually');
    await expect(deleteButtons).toHaveCount(3);
    
    // Get all elements and iterate
    const allButtons = await deleteButtons.all();
    expect(allButtons.length).toBe(3);
    
    // Delete all one by one
    for (let i = 0; i < 3; i++) {
      await deleteButtons.first().click();
    }
    
    // Verify all deleted
    await expect(deleteButtons).toHaveCount(0);
  });

  // ========================================
  // 17. Dropdown Example
  // ========================================
  test('Working with dropdowns', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    
    const dropdown = page.locator('#dropdown');
    
    // Select by value
    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');
    
    // Select by label
    await dropdown.selectOption({ label: 'Option 2' });
    await expect(dropdown).toHaveValue('2');
    
    // Verify selected text
    const selectedText = await dropdown.locator('option[selected]').textContent();
    expect(selectedText).toBe('Option 2');
  });

  // ========================================
  // 18. Checkboxes Example
  // ========================================
  test('Working with checkboxes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    
    // Get all checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');
    
    // Check first checkbox
    await checkboxes.nth(0).check();
    await expect(checkboxes.nth(0)).toBeChecked();
    
    // Uncheck second checkbox (if checked)
    await checkboxes.nth(1).uncheck();
    await expect(checkboxes.nth(1)).not.toBeChecked();
    
    // Toggle
    await checkboxes.nth(0).check();
    await expect(checkboxes.nth(0)).toBeChecked();
  });

  // ========================================
  // 19. File Upload Example
  // ========================================
  test('File upload example', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    
    // Set input files (simulated)
    const fileInput = page.locator('#file-upload');
    
    // Create a test file buffer
    await fileInput.setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is test content')
    });
    
    // Click upload
    await page.locator('#file-submit').click();
    
    // Verify upload success
    await expect(page.locator('h3')).toContainText('File Uploaded!');
  });

  // ========================================
  // 20. Table Example
  // ========================================
  test('Working with tables', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
    
    // Find specific cell
    const table = page.locator('#table1');
    const rows = table.locator('tbody tr');
    
    // Count rows
    await expect(rows).toHaveCount(4);
    
    // Find row containing specific text
    const smithRow = rows.filter({ hasText: 'Smith' });
    await expect(smithRow).toBeVisible();
    
    // Get cell value
    const firstCell = rows.first().locator('td').first();
    await expect(firstCell).toContainText('Smith');
    
    // Click link in table
    await rows.first().locator('a', { hasText: 'edit' }).click();
  });

});

/**
 * BEST PRACTICES SUMMARY:
 * 
 * 1. Locator Priority (most to least preferred):
 *    ✅ getByRole - Most reliable, accessibility-friendly
 *    ✅ getByLabel - Great for forms
 *    ✅ getByPlaceholder - Good for inputs
 *    ✅ getByText - User-facing text
 *    ⚠️  getByTestId - For dynamic content
 *    ❌ CSS/XPath - Last resort, fragile
 * 
 * 2. Always wait for elements implicitly (Playwright auto-waits)
 * 
 * 3. Use specific locators over generic ones
 * 
 * 4. Chain locators for better specificity
 * 
 * 5. Use filters (has, hasText) to narrow results
 * 
 * 6. Prefer user-facing attributes over implementation details
 * 
 * 7. Use toHaveCount() for dynamic lists
 * 
 * 8. Always verify state changes with assertions
 */
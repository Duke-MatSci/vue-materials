const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const TEST_URL = process.env.TEST_URL || 'http://localhost:8081';
  console.log('Testing at:', TEST_URL);

  await page.goto(`${TEST_URL}/#/components/text-fields`);
  await page.waitForTimeout(2000);

  console.log('\n=== DIAGNOSTIC TEST FOR LABEL FLOATING ===\n');

  // Test the first field with initial value
  const firstField = page.locator('.md-field').first();
  const firstInput = firstField.locator('input.md-input');
  const firstLabel = firstField.locator('label');

  console.log('1. Checking initial state (field has value "Initial Value"):');
  const initialClasses = await firstField.getAttribute('class');
  console.log('   Field classes:', initialClasses);
  console.log('   Has md-has-value class:', initialClasses.includes('md-has-value'));
  console.log('   Has md-focused class:', initialClasses.includes('md-focused'));

  const inputValue = await firstInput.inputValue();
  console.log('   Input value:', inputValue);

  const labelText = await firstLabel.textContent();
  console.log('   Label text:', labelText);

  // Get the actual computed styles
  const labelTop = await firstLabel.evaluate(el => window.getComputedStyle(el).top);
  const labelFontSize = await firstLabel.evaluate(el => window.getComputedStyle(el).fontSize);
  const labelOpacity = await firstLabel.evaluate(el => window.getComputedStyle(el).opacity);
  console.log(`   Label styles: top=${labelTop}, fontSize=${labelFontSize}, opacity=${labelOpacity}`);

  // Check MdField reactive state via Vue devtools API
  const mdFieldState = await firstField.evaluate((el) => {
    // Try to access Vue instance
    if (el.__vueParentComponent) {
      const ctx = el.__vueParentComponent.ctx;
      return {
        MdFieldValue: ctx.MdField?.value,
        MdFieldFocused: ctx.MdField?.focused,
        stringValue: ctx.stringValue,
        hasValue: ctx.hasValue
      };
    }
    return null;
  });
  console.log('   MdField reactive state:', mdFieldState);

  console.log('\n2. Clicking on input (should add md-focused class):');
  await firstInput.click();
  await page.waitForTimeout(500);

  const focusedClasses = await firstField.getAttribute('class');
  console.log('   Field classes after click:', focusedClasses);
  console.log('   Has md-focused class:', focusedClasses.includes('md-focused'));

  const labelTopFocused = await firstLabel.evaluate(el => window.getComputedStyle(el).top);
  const labelFontSizeFocused = await firstLabel.evaluate(el => window.getComputedStyle(el).fontSize);
  console.log(`   Label styles: top=${labelTopFocused}, fontSize=${labelFontSizeFocused}`);

  // Check the MdField state after focus
  const mdFieldStateFocused = await firstField.evaluate((el) => {
    if (el.__vueParentComponent) {
      const ctx = el.__vueParentComponent.ctx;
      return {
        MdFieldValue: ctx.MdField?.value,
        MdFieldFocused: ctx.MdField?.focused,
        stringValue: ctx.stringValue,
        hasValue: ctx.hasValue
      };
    }
    return null;
  });
  console.log('   MdField reactive state after focus:', mdFieldStateFocused);

  console.log('\n3. Typing in empty input field:');
  // Find an empty field
  const emptyField = page.locator('.md-field').nth(2); // "Type here!" field
  const emptyInput = emptyField.locator('input.md-input');

  await emptyInput.click();
  await emptyInput.fill('Test');
  await page.waitForTimeout(500);

  const typedClasses = await emptyField.getAttribute('class');
  console.log('   Field classes after typing:', typedClasses);
  console.log('   Has md-has-value class:', typedClasses.includes('md-has-value'));
  console.log('   Has md-focused class:', typedClasses.includes('md-focused'));

  const typedValue = await emptyInput.inputValue();
  console.log('   Input value:', typedValue);

  // Check the MdField state after typing
  const mdFieldStateTyped = await emptyField.evaluate((el) => {
    if (el.__vueParentComponent) {
      const ctx = el.__vueParentComponent.ctx;
      return {
        MdFieldValue: ctx.MdField?.value,
        MdFieldFocused: ctx.MdField?.focused,
        stringValue: ctx.stringValue,
        hasValue: ctx.hasValue
      };
    }
    return null;
  });
  console.log('   MdField reactive state after typing:', mdFieldStateTyped);

  console.log('\n4. Blurring the input (should remove md-focused, keep md-has-value):');
  await emptyInput.blur();
  await page.waitForTimeout(500);

  const blurredClasses = await emptyField.getAttribute('class');
  console.log('   Field classes after blur:', blurredClasses);
  console.log('   Has md-has-value class:', blurredClasses.includes('md-has-value'));
  console.log('   Has md-focused class:', blurredClasses.includes('md-focused'));

  console.log('\n=== END DIAGNOSTIC TEST ===\n');

  // Keep browser open for manual inspection
  console.log('Browser will stay open for 30 seconds for manual inspection...');
  await page.waitForTimeout(30000);

  await browser.close();
})();

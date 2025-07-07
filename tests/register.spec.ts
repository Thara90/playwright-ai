import { test, expect } from '../pages/fixtures';
import { generateRegistrationData } from '../pages/helpreBase';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test('Customer can register a new account on practicesoftwaretesting.com', async ({ page, registerPage }) => {
  const registrationData = generateRegistrationData();
  await page.getByRole('link', { name: 'Register your account' }).click();
  await registerPage.fillRegistrationForm(registrationData);
  await registerPage.submit();
  await registerPage.assertRegistrationSuccess();
});

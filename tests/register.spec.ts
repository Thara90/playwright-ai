import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

test('Customer can register a new account on practicesoftwaretesting.com', async ({ page }) => {
  const uniqueEmail = `testuser.automation+${Date.now()}@example.com`;
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.fillRegistrationForm({
    firstName: 'TestUser',
    lastName: 'Automation',
    dob: '1990-01-01',
    street: '123 Main St',
    postalCode: '12345',
    city: 'Testville',
    state: 'TestState',
    country: 'United States of America (the)',
    phone: '5551234567',
    email: uniqueEmail,
    password: 'Test@1234',
  });
  await registerPage.submit();
  await registerPage.assertRegistrationSuccess();
});

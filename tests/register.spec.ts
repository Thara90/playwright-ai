import { test, expect } from '../pages/fixtures';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test('Customer can register a new account on practicesoftwaretesting.com', async ({ page, registerPage }) => {
  const uniqueEmail = `testuser.automation+${Date.now()}@example.com`;
  await page.getByRole('link', { name: 'Register your account' }).click();
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
  await page.pause(); // Wait for 1 second to simulate user interactio
  await registerPage.submit();
  //await registerPage.assertRegistrationSuccess();
});

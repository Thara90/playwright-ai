import { test, expect } from '../pages/fixtures';
import { generateRegistrationData } from '../pages/helpreBase';
import { AdminPage } from '../pages/admin.page';

let registrationData;

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test('Customer can register a new account and login on practicesoftwaretesting.com, then admin deletes user', async ({ page, registerPage, loginPage }) => {
  registrationData = generateRegistrationData();
  await page.getByRole('link', { name: 'Register your account' }).click();
  await registerPage.fillRegistrationForm(registrationData);
  await registerPage.submit();
  await registerPage.assertRegistrationSuccess();

  await loginPage.goto();
  await loginPage.login(registrationData.email, registrationData.password);
  await loginPage.assertLoginSuccess();

  // Admin deletes the created user
  const adminPage = new AdminPage(page);
  await adminPage.goto();
  await adminPage.login('admin@practicesoftwaretesting.com', 'welcome01');
  await adminPage.deleteUser(registrationData.email);
});

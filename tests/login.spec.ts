import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Customer can log in to practicesoftwaretesting.com', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  await loginPage.assertLoginSuccess();
});

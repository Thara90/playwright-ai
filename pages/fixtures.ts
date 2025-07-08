import { test as base } from '@playwright/test';
import { LoginPage } from './login.page';
import { RegisterPage } from './register.page';
import { AdminPage } from './admin.page';

export const test = base.extend<{
  loginPage: LoginPage;
  registerPage: RegisterPage;
  adminPage: AdminPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
});

export { expect } from '@playwright/test';

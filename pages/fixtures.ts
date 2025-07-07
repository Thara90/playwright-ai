import { test as base } from '@playwright/test';
import { LoginPage } from './login.page';
import { RegisterPage } from './register.page';

export const test = base.extend<{
  loginPage: LoginPage;
  registerPage: RegisterPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

export { expect } from '@playwright/test';

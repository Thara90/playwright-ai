export class LoginPage {
  emailInput;
  passwordInput;
  submitButton;
  myAccountHeading;
  ddNavigationMenu;
  signOut;

  constructor(public page) {
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="login-submit"]');
    this.myAccountHeading =page.getByRole('heading', { name: 'My account' });
    this.ddNavigationMenu = page.locator('[data-test="nav-menu"]');
    this.signOut = page.locator('[data-test="nav-sign-out"]');
  }

  // Functions
  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.page.getByRole('menuitem', { name: 'Sign in' }).click();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async assertLoginSuccess() {
    await this.myAccountHeading.waitFor({ state: 'visible' });
  }

  async logout() {
    await this.ddNavigationMenu.click();
    await this.signOut.click();
  }
}

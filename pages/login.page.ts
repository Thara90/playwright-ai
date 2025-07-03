export class LoginPage {
  emailInput;
  passwordInput;
  submitButton;
  myAccountHeading;

  constructor(public page) {
    this.emailInput = this.page.locator('[data-test="email"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.submitButton = this.page.locator('[data-test="login-submit"]');
    this.myAccountHeading = this.page.getByRole('heading', { name: 'My account' });
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
}

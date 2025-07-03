export class RegisterPage {
  constructor(public page) {}

  // Locators
  get firstNameInput() { return this.page.locator('[data-test="first-name"]'); }
  get lastNameInput() { return this.page.locator('[data-test="last-name"]'); }
  get dobInput() { return this.page.locator('[data-test="dob"]'); }
  get streetInput() { return this.page.locator('[data-test="street"]'); }
  get postalCodeInput() { return this.page.locator('[data-test="postal_code"]'); }
  get cityInput() { return this.page.locator('[data-test="city"]'); }
  get stateInput() { return this.page.locator('[data-test="state"]'); }
  get countrySelect() { return this.page.locator('[data-test="country"]'); }
  get phoneInput() { return this.page.locator('[data-test="phone"]'); }
  get emailInput() { return this.page.locator('[data-test="email"]'); }
  get passwordInput() { return this.page.locator('[data-test="password"]'); }
  get submitButton() { return this.page.locator('[data-test="register-submit"]'); }
  get myAccountHeading() { return this.page.getByRole('heading', { name: 'My account' }); }

  // Functions
  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.page.getByRole('menuitem', { name: 'Sign in' }).click();
    await this.page.getByRole('link', { name: 'Register your account' }).click();
  }

  async fillRegistrationForm({
    firstName,
    lastName,
    dob,
    street,
    postalCode,
    city,
    state,
    country,
    phone,
    email,
    password
  }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dobInput.fill(dob);
    await this.streetInput.fill(street);
    await this.postalCodeInput.fill(postalCode);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.countrySelect.selectOption(country);
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async assertRegistrationSuccess() {
    await this.myAccountHeading.waitFor({ state: 'visible' });
  }
}

import { generateRegistrationData } from './helpreBase';

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


  async fillRegistrationForm(data?) {
    // If no data is provided, generate it
    const formData = data || generateRegistrationData();
    await this.firstNameInput.fill(formData.firstName);
    await this.lastNameInput.fill(formData.lastName);
    await this.dobInput.fill(formData.dob);
    await this.streetInput.fill(formData.street);
    await this.postalCodeInput.fill(formData.postalCode);
    await this.cityInput.fill(formData.city);
    await this.stateInput.fill(formData.state);
    await this.countrySelect.selectOption(formData.country);
    await this.phoneInput.fill(formData.phone);
    await this.emailInput.fill(formData.email);
    await this.passwordInput.fill(formData.password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async assertRegistrationSuccess() {
    // Wait for the registration network request to succeed with 201
    await this.page.waitForResponse(response => {
      return response.url().includes('/users/register') && response.status() === 201;
    });
  }
}

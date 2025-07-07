import { generateRegistrationData } from './helpreBase';

export class RegisterPage {
  firstNameInput;
  lastNameInput;
  dobInput;
  streetInput;
  postalCodeInput;
  cityInput;
  stateInput;
  countrySelect;
  phoneInput;
  emailInput;
  passwordInput;
  submitButton;
  myAccountHeading;

  constructor(public page) {
    this.firstNameInput = this.page.locator('[data-test="first-name"]');
    this.lastNameInput = this.page.locator('[data-test="last-name"]');
    this.dobInput = this.page.locator('[data-test="dob"]');
    this.streetInput = this.page.locator('[data-test="street"]');
    this.postalCodeInput = this.page.locator('[data-test="postal_code"]');
    this.cityInput = this.page.locator('[data-test="city"]');
    this.stateInput = this.page.locator('[data-test="state"]');
    this.countrySelect = this.page.locator('[data-test="country"]');
    this.phoneInput = this.page.locator('[data-test="phone"]');
    this.emailInput = this.page.locator('[data-test="email"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.submitButton = this.page.locator('[data-test="register-submit"]');
    this.myAccountHeading = this.page.getByRole('heading', { name: 'My account' });
  }

  // Functions
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

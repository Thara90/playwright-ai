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
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.dobInput = page.locator('[data-test="dob"]');
    this.streetInput = page.locator('[data-test="street"]');
    this.postalCodeInput = page.locator('[data-test="postal_code"]');
    this.cityInput = page.locator('[data-test="city"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.countrySelect = page.locator('[data-test="country"]');
    this.phoneInput = page.locator('[data-test="phone"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="register-submit"]');
    this.myAccountHeading = page.getByRole('heading', { name: 'My account' });
  }

  async fillRegistrationForm(data?) {
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

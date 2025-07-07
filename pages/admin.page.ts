import { generateRegistrationData } from './helpreBase';

export class AdminPage {
  emailInput;
  passwordInput;
  submitButton;
  usersMenu;
  searchInput;
  searchButton;
  deleteButton;
  confirmDeleteButton;

  constructor(public page) {
    this.emailInput = this.page.locator('[data-test="email"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.submitButton = this.page.locator('[data-test="login-submit"]');
    this.usersMenu = this.page.getByRole('menuitem', { name: 'Users' });
    this.searchInput = this.page.locator('[data-test="search-user"]');
    this.searchButton = this.page.locator('[data-test="search-submit"]');
    this.deleteButton = this.page.getByRole('button', { name: 'Delete' });
    this.confirmDeleteButton = this.page.getByRole('button', { name: 'Confirm' });
  }

  // Functions
  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/admin');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async deleteUser(email: string) {
    await this.usersMenu.click();
    await this.searchInput.fill(email);
    await this.searchButton.click();
    await this.deleteButton.click();
    await this.confirmDeleteButton.click();
  }
}

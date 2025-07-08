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
  ddNavigationMenu;

  constructor(public page) {
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="login-submit"]');
    this.usersMenu = page.locator('[data-test="nav-admin-users"]');
    this.searchInput = page.locator('[data-test="user-search-query"]');
    this.searchButton = page.locator('[data-test="user-search-submit"]');
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.ddNavigationMenu = page.locator('[data-test="nav-menu"]');
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
    await this.ddNavigationMenu.click();
    await this.usersMenu.click();
    // Wait for the users page to load and search input to be visible
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(email);
    await this.searchButton.click();
    // Assert the user appears in the search result before deleting
    const userRow = this.page.getByText(email, { exact: false });
    await userRow.waitFor({ state: 'visible' });
    await this.deleteButton.click();
  }
}

import { Locator, Page } from "@playwright/test";

export class Login {
  page: Page;

  constructor(page: Page) {
    this.page = page;

  }

  async timeOut() {
    await this.page.waitForTimeout(5 * 1000);
  }
  async gotoAdmin() {
    await this.page.goto(
      "https://accounts.shopbase.com/sign-in?return_url=https%3A%2F%2Fxuyenshopbasepom.onshopbase.com%2Fadmin%2F"
    );
  }

  async login() {
    await this.page.locator("//input[@id='email']").fill("tuyetle+1@beeketing.net");
    await this.page.locator("//input[@id='password']").fill("123456");
    await this.page.locator("//button[@type='submit']").click();
    
  }
}

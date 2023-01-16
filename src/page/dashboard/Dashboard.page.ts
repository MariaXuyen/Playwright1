import { Page } from "@playwright/test";

export class Dashboard {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToMenu(menuName: string){
    await this.page.click(`//span[@class="unite-ui-dashboard__aside--text" and normalize-space()="${menuName}"]`)

  }
  async subMenu(menuName: string){
    await this.page.click(`//span[normalize-space()=${subMenu}]`);

  }

}
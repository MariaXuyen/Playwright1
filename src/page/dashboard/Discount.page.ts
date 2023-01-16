import { Locator, Page } from "@playwright/test";
import { Dashboard } from "./Dashboard.page";

export class Discount extends Dashboard {
  createDiscountButton: Locator;
  discountCode: Locator;
  discountValue: Locator;
  appliesTo: Locator;
  startDate: Locator;
  searchProduct: Locator;
  selectProduct: Locator;
  saveProductButton: Locator;
  saveChangesButton: Locator;

  constructor(page: Page) {
    super(page);
    this.createDiscountButton = this.page.locator(
      "//span[normalize-space()='Create discount']"
    );
    this.discountCode = this.page.locator("//input[@placeholder='e.g. SUMMERSALE']");
    this.discountValue = this.page.locator("//input[@placeholder='0']");
    this.appliesTo = this.page.locator("//span[normalize-space()='Specific products']");
    this.searchProduct = this.page.locator(
      "//input[contains(@placeholder='Search for product']"
    );
    this.selectProduct = this.page.locator(
      "//div[contains(@class,'item-list')]/div[contains(@class,'item-wrapper')]/div[contains(@class,'item')]/label[contains(@class,'s-checkbox')]/span[1]"
    );
    this.saveProductButton = this.page.locator(
      "//div[contains(@class,'s-modal-footer')]//span[contains(@class,'s-flex s-flex--align-center')][normalize-space()='Save']"
    );
    this.saveChangesButton = this.page.locator("//span[normalize-space()='Save changes']");
  }

  async fillDiscountCode() {
    await this.createDiscountButton.click();
    this.discountCode.fill("OCG_2023_TALENT")
    this.discountValue.fill("10");
    this.appliesTo.click();
    this.searchProduct.fill("iPhone 14 Pro Max 128GB - XuyenPham");
    this.selectProduct.click();
    this.saveChangesButton.click();

  }


}

import { Locator, Page } from "@playwright/test";
import { Dashboard } from "./Dashboard.page";

export class Collection extends Dashboard {
  createCollectionButton: Locator;
  collectionTitle: Locator;
  collectionType: Locator;
  saveButton: Locator;
  addProductToCollection: Locator;
  searchProducts: Locator;
  selectProduct: Locator;
  saveProductButton: Locator;
  viewProductEye: Locator;

  
  constructor(page: Page) {
    super(page);
    this.createCollectionButton = this.page.locator(
      "//button[@class='s-button is-primary']"
    );
    this.collectionTitle = this.page.locator(
      "//input[@placeholder='e.g Summer collection, Under $100, Staff picks']"
    );
    this.collectionTitle = this.page.locator(
      "//div[@class='col-md-8 col-xs-12']//div[1]//label[1]//span[2]"
    );
    this.collectionType = this.page.locator(
      "//div[@class='col-md-8 col-xs-12']//div[1]//label[1]//span[2]"
    );
    this.saveButton = this.page.locator("//span[normalize-space()='Save']");
    this.addProductToCollection = this.page.locator(
      "//button[normalize-space()='Add product']"
    );
    this.searchProducts = this.page.locator(
      "//input[@placeholder='Search for product']"
    );
    this.selectProduct = this.page.locator(
      "//div[@class='item-list']//div[1]//div[1]//label[1]//span[1]"
    );
    this.saveProductButton = this.page.locator(
      "//div[@class='s-modal-footer']//span[@class='s-flex s-flex--align-center'][normalize-space()='Save']"
    );
    this.viewProductEye = this.page.locator("//i[@class='mdi mdi-eye mdi-18px d-flex']");
    // this.selectCollection.locator()
  }

  async createCollection(){
    await this.createCollectionButton.click();
    await this.collectionTitle.fill("Mobile Phone");
    await this.collectionType.click();
    await this.saveButton.click();
    await this.page.waitForLoadState("networkidle");
  }
  // async deleteCollection(){
  //   await this.selectCollection.click();
  
  }


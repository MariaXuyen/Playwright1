import test, { expect } from "@playwright/test";
import { Login } from "../src/page/Authentication/Login.page";
import { Collection } from "../src/page/dashboard/Collection.page";
import { Product } from "../src/page/dashboard/product.page";

let collectionPage: Collection;
test.beforeEach(async ({ page }) => {
  const loginPage = new Login(page);
  collectionPage = new Collection(page);

  await loginPage.gotoAdmin();
  await loginPage.login();
  await loginPage.timeOut();
});

test("test_create_collection", async ({ page, context }) => {
  await test.step("Navigate to Menu", async () => {
    await collectionPage.navigateToMenu("Products");
    await collectionPage.subMenu("Collections");
    await page.waitForLoadState("networkidle");
  });

  await test.step("Add  a collection", async () => {
    await collectionPage.createCollectionButton.click();
    await collectionPage.collectionTitle.fill("Mobile Phone");
    await collectionPage.collectionType.click();
    await collectionPage.saveButton.click();
    await page.waitForLoadState("networkidle");

  });
  await test.step("Add product to colleciton", async () => {
    await collectionPage.addProductToCollection.click();
    await collectionPage.searchProducts.fill(
      "iPhone 14 Pro Max 128GB - XuyenPham"
    );
    await collectionPage.selectProduct.click();
    await collectionPage.saveProductButton.click();
  });

  const [productStorefrontPage] = await Promise.all([
    context.waitForEvent("page"),
    await collectionPage.viewProductEye.click()
  ]);

  const result = await productStorefrontPage
    .locator("h4 d-block product__name mt0 mb12 product__name-product")
    .textContent();

  // Verify title
  expect(result).toEqual("iPhone 14 Pro Max 128GB - XuyenPham");

  const optionLocators = await productStorefrontPage
    .locator("//button[contains(@class, 'product__option')]")
    .all();

  const createdOptions = ["Space black", "Silver", "Gold", "Deep Purple"];

  for (let i = 0; i < optionLocators.length; i++) {
    const optionText = await optionLocators[i].textContent();
    expect(optionText).toEqual(createdOptions[i]);
  }
});

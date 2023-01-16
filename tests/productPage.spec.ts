import test, { expect } from "@playwright/test";
import { Login } from "../src/page/Authentication/Login.page";
import { Checkout } from "../src/page/dashboard/Checkout.page";
import { Collection } from "../src/page/dashboard/Collection.page";
import { Discount } from "../src/page/dashboard/Discount.page";
import { Product } from "../src/page/dashboard/product.page";

test.describe("product test", () => {
  let loginPage;
  let productPage: Product;

  test.beforeEach(async ({ page }) => {
    loginPage = new Login(page);
    productPage = new Product(page);

    await loginPage.gotoAdmin();
    await loginPage.login();
    await loginPage.timeOut();
  });

  test("test_create_product", async ({ page, context }) => {
    await test.step("Navigate to Menu", async () => {
      await productPage.navigateToMenu("Products");
      await page.waitForLoadState("networkidle");
    });

    await test.step("Click button Add product", async () => {
      await productPage.clickButtonAddProduct();
      //await page.waitForLoadState();
      await productPage.page.waitForTimeout(3000);
    });

    await test.step("Input product info", async () => {
      await productPage.title.fill("iPhone 14 Pro Max 128GB - XuyenPham");
      await productPage.price.fill("100");
      await productPage.addVariantButton.click();
      await productPage.optionName.fill("Color");
      await productPage.optionValues.fill(
        "Space Black, Silver, Gold, Deep Purple"
      );
      await productPage.saveProductButton.click();

      const [productStorefrontPage] = await Promise.all([
        context.waitForEvent("page"),
        await page.click('//i[@class="mdi mdi-eye mdi-18px d-flex"]'),
      ]);

      const result = await productStorefrontPage
        .locator(
          "//h1[normalize-space()='iPhone 14 Pro Max 128GB - XuyenPham']"
        )
        .textContent();

      // Verify title
      expect(result).toEqual("iPhone 14 Pro Max 128GB - XuyenPham");

      const optionLocators = await productStorefrontPage
        .locator("//button[contains(@class, 'product__option')]")
        .all();

      const createdOptions = ["Space Black", "Silver", "Gold", "Deep Purple"];

      for (let i = 0; i < optionLocators.length; i++) {
        const optionText = await optionLocators[i].textContent();
        expect(optionText).toEqual(createdOptions[i]);
      }
    });
  });

  // test("test_create_collection", async ({ page, context }) => {
  //   const collectionPage = new Collection(page);
  //   await test.step("Navigate to Menu", async () => {
  
  //     await collectionPage.navigateToMenu("Products");
  //     await collectionPage.subMenu("Collections");
  //     await page.waitForLoadState("networkidle");
  //   });

  //   await test.step("Add  a collection", async () => {
  //     await collectionPage.createCollectionButton.click();
  //     await collectionPage.collectionTitle.fill("Mobile Phone");
  //     await collectionPage.collectionType.click();
  //     await collectionPage.saveButton.click();
  //     await page.waitForLoadState("networkidle");
  //   });
  //   await test.step("Add product to colleciton", async () => {
  //     await collectionPage.addProductToCollection.click();
  //     await collectionPage.searchProducts.fill(
  //       "iPhone 14 Pro Max 128GB - XuyenPham"
  //     );
  //     await collectionPage.selectProduct.click();
  //     await collectionPage.saveProductButton.click();
  //   });

  //   const [productStorefrontPage] = await Promise.all([
  //     context.waitForEvent("page"),
  //     await collectionPage.viewProductEye.click(),
  //   ]);

  //   const result = await productStorefrontPage
  //     .locator("h4 d-block product__name mt0 mb12 product__name-product")
  //     .textContent();

  //   // Verify title
  //   expect(result).toEqual("iPhone 14 Pro Max 128GB - XuyenPham");

  //   const optionLocators = await productStorefrontPage
  //     .locator("//button[contains(@class, 'product__option')]")
  //     .all();

  //   const createdOptions = ["Space black", "Silver", "Gold", "Deep Purple"];

  //   for (let i = 0; i < optionLocators.length; i++) {
  //     const optionText = await optionLocators[i].textContent();
  //     expect(optionText).toEqual(createdOptions[i]);
  //   }
  // });

  // test("test_create_discount", async ({ page, context }) => {
  //   const discountPage = new Discount(page);
  //   const checkoutPage = new Checkout(page);

  //   await test.step("Navigate to Menu", async () => {
  //     await discountPage.navigateToMenu("Discounts");
  //     await page.goto(
  //       "https://xuyenshopbasepom.onshopbase.com/admin/discounts"
  //     );
  //     // await page.waitForLoadState("networkidle");
  //   });

  //   await test.step("Fill discount info", async () => {
  //     await discountPage.fillDiscountCode();
  //   });
  //   await test.step("Check out", async () => {
  //     await checkoutPage.checkout();
  //   });
  // });

  test.afterAll(async ({ page }) => {
    const productPage = new Product(page);

    await productPage.deleteProduct();

  });
});

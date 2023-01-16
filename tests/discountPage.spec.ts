import test from "@playwright/test";
import { Login } from "../src/page/Authentication/Login.page";
import { Checkout } from "../src/page/dashboard/Checkout.page";
import { Discount } from "../src/page/dashboard/Discount.page";
import { Product } from "../src/page/dashboard/product.page";

test.beforeEach(async ({ page }) => {
  const loginPage = new Login(page);
  // const discountPage = new Discount(page);

  await loginPage.gotoAdmin();
  await loginPage.login();
  await loginPage.timeOut();
});

test("test_create_discount", async ({ page, context }) => {
  const discountPage = new Discount(page);
  const checkoutPage = new Checkout(page);

  await test.step("Navigate to Menu", async () => {
    await discountPage.navigateToMenu("Discounts");
    // await page.waitForLoadState("networkidle");
  });

  await test.step("Fill discount info", async () => {
    await discountPage.fillDiscountCode();
  });
  await test.step("Check out", async () => {
    await checkoutPage.checkout();
  });


});
test.afterAll(async ({page}) =>{
  const productPage = new Product(page);

  await productPage.deleteProduct();

})

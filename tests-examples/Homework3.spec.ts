import { test, expect } from "@playwright/test";

test("bai3", async ({ page, context }) => {
  await page.goto(
    "https://accounts.shopbase.com/sign-in?return_url=https%3A%2F%2Fxuyenshop01.onshopbase.com%2Fadmin%2Fdiscounts"
  );
    // đăng nhập
  await page.fill("input[name='email']", "marykimxuyen99@gmail.com");
  await page.fill("input[name='password']", "Xuyen1999@");
  await page.click("//button[@class='s-button is-primary is-fullwidth']");

  await page.waitForTimeout(5 * 1000);

  // direct to discount 
  // await page.goto("https://xuyenshop01.onshopbase.com/admin/discounts");
  // await page.waitForTimeout(5 * 1000);

  // //Click button Create discount 
  // await page.click("//span[normalize-space()='Create discount']");

  // //input Discount code
  // await page.fill("//input[@placeholder='e.g. SUMMERSALE']", "OCG_2023_TALENT");

  // //Fill %
  // await page.fill("//input[@placeholder='0']", "10");

  // // Select Specific products
  // await page.click("//span[normalize-space()='Specific products']");

  // //click button Browser
  // await page.click(
  //   "//div[contains(@class,'select-product-component s-mt16')]//button[contains(@type,'button')]"
  // );

  // //Input product name
  // await page.fill(
  //   "//input[contains(@placeholder,'Search for product')]",
  //   "iPhone 14 Pro Max 128GB - XuyenPham"
  // );

  // //Select product
  // await page.click(
  //   "//div[contains(@class,'item-list')]/div[contains(@class,'item-wrapper')]/div[contains(@class,'item')]/label[contains(@class,'s-checkbox')]/span[1]"
  // );

  // //Save product
  // await page.click(
  //   "//div[contains(@class,'s-modal-footer')]//span[contains(@class,'s-flex s-flex--align-center')][normalize-space()='Save']"
  // );

  // //Save Discount code
  // await page.click("//span[normalize-space()='Save changes']");

  // await page.waitForTimeout(10 * 1000);

  // Click Product in Menu bar
  await page.click("//span[normalize-space()='Products']");

  // Select product
  await page.click(
    "//span[normalize-space()='iPhone 14 Pro Max 128GB - XuyenPham']"
  );
    await page.waitForTimeout(3*1000);

    //Click icon eye to direct to new window
    const [productStorefrontPage] = await Promise.all([
        context.waitForEvent("page"),
        await page.click('//i[@class="mdi mdi-eye mdi-18px d-flex"]')
    ]);
    //await productStorefrontPage.waitForLoadState("networkidle");

    await productStorefrontPage.waitForTimeout(3*1000);

  await productStorefrontPage.click("//span[normalize-space()='Add to cart']");

  // Click button Checkout
  await productStorefrontPage.click("//button[normalize-space()='Checkout']");

  await productStorefrontPage.waitForTimeout(5 * 1000);

  await productStorefrontPage.fill(
    "//input[@id='checkout_shipping_address_email']",
    "marykimxuyen99@gmail.com"
  );

  await productStorefrontPage.fill(
    "//input[@id='checkout_shipping_address_last_name']",
    "Pham"
  );

  await productStorefrontPage.fill(
    "//input[@id='checkout_shipping_address_address_line1']",
    "Hanoi"
  );

  await productStorefrontPage.fill(
    "//input[@id='checkout_shipping_address_city']",
    "Hanoi"
  );

  await productStorefrontPage.fill(
    "//input[@id='checkout_shipping_address_phone']",
    "0123456789"
  );

  await productStorefrontPage.fill(
    "//input[@placeholder='Enter your promotion code']",
    "OCG_2023_TALENT"
  );

  await productStorefrontPage.click("//button[normalize-space()='Apply']");

  //Continue to shipping method

  await productStorefrontPage.click("//button[normalize-space()='Continue to shipping method']");

  await productStorefrontPage.click(
    "//button[normalize-space()='Continue to payment method']"
  );

  // const cardboard = await page
  //   .locator(`#stripe-frame-form-wrapper`)
  //   .frameLocator(
  //     "//div[@class='section']//div[@class='section']//fieldset[@class='content-box']"
  //   );



await productStorefrontPage.waitForTimeout(4000);

    await productStorefrontPage
    .locator("//div[@class='fieldset stripe-form test-gateway']") 
    .frameLocator("//div[@id='stripe-card-number']//iframe") 
    .locator(`//input[@placeholder='Card number']`)
    .fill("4242424242424242");


  await productStorefrontPage
    .locator("//input[@placeholder='Cardholder name']")
    .fill("Xuyen");

  await productStorefrontPage.locator("//div[@class='fieldset stripe-form test-gateway']") 
  .frameLocator("//div[@id='stripe-card-expiry']//iframe") 
  .locator(`//input[@placeholder='MM/YY']`).fill("0326");

  await productStorefrontPage.locator("//div[@class='fieldset stripe-form test-gateway']") 
  .frameLocator("//div[@id='stripe-card-cvc']//iframe") 
  .locator("//input[@placeholder='CVV']")
  .fill("111");

  await productStorefrontPage.locator("//button[normalize-space()='Complete order']").click();

  const totalPrice = await productStorefrontPage
    .locator("//span[@class='payment-due__price']")
    .textContent();

  expect(totalPrice).toEqual("$1,356.99");
});






test("baibayb", async ({ page, context }) => {
  await page.goto("https://xuyenshop01.onshopbase.com/admin/discounts");

  await page.fill("input[name='email']", "marykimxuyen99@gmail.com");
  await page.fill("input[name='password']", "Xuyen1999@");
  await page.click("//button[@class='s-button is-primary is-fullwidth']");

  await page.waitForTimeout(5 * 1000);
  await page.click("//span[normalize-space()='OCG_2023_TALENT']");

  await page.click("//input[@class='s-input__inner']");
  
  await page.click("//span[normalize-space()='19']");

  await page.click("//span[normalize-space()='Confirm']");

  await page.click(
    "//span[normalize-space()='Save changes']"
  );

  const discountStatus = await page
    .locator("//p[@class='text-capitialize']")
    .textContent();

  expect(discountStatus).toEqual("Scheduled");
});

import { test, expect } from "@playwright/test";

test("bai2", async ({ page, context }) => {
  //Dang nhap
  await page.goto(
    "https://accounts.shopbase.com/sign-in?return_url=https%3A%2F%2Fxuyenshop01.onshopbase.com%2Fadmin%2Fdiscounts"
  );
  // đăng nhập
  await page.fill("input[name='email']", "marykimxuyen99@gmail.com");
  await page.fill("input[name='password']", "Xuyen1999@");
  await page.click("//button[@class='s-button is-primary is-fullwidth']");

  await page.waitForTimeout(5 * 1000);

  await page.click("//span[normalize-space()='Products']");
  await page.waitForTimeout(1 * 1000);
  await page.click("//span[normalize-space()='Collections']");
  await page.waitForTimeout(1 * 1000);
  await page.click("//button[@class='s-button is-primary']");
  await page.waitForTimeout(3 * 1000);
  await page
    .locator(
      "//input[@placeholder='e.g Summer collection, Under $100, Staff picks']"
    )
    .fill("Mobile phone");
  await page.click(
    "//div[@class='col-md-8 col-xs-12']//div[1]//label[1]//span[2]"
  );
  await page.waitForTimeout(1 * 1000);
  await page.click(
    "//div[@class='col-md-8 col-xs-12']//div[1]//label[1]//span[2]"
  );
  await page.waitForTimeout(1 * 1000);
  await page.click("//span[normalize-space()='Save']");
  await page.waitForTimeout(1 * 1000);
  await page.click("//button[normalize-space()='Add product']");
  await page
    .locator("//input[@placeholder='Search for product']")
    .fill("iPhone 14 Pro Max 128GB - XuyenPham");
  await page.waitForTimeout(4 * 1000);
  await page.click(
    "//div[@class='item-list']//div[1]//div[1]//label[1]//span[1]"
  );
  await page.click(
    "//div[@class='s-modal-footer']//span[@class='s-flex s-flex--align-center'][normalize-space()='Save']"
  );
  await page.waitForTimeout(4 * 1000);
  await page.click("//span[normalize-space()='Refresh']");
  await page.waitForTimeout(2 * 1000);

  const [collectionPage] = await Promise.all([
    context.waitForEvent("page"),
    await page.click('//i[@class="mdi mdi-eye mdi-18px d-flex"]'),
  ]);

  await page.waitForTimeout(2 * 1000);
  const result = await page
    .locator(
      "//div[@class='row mt16 product-grid']//div[1]//div[1]//a[1]//div[2]//span[@class='title d-block cl-black']"
    )
    .textContent();

  // Verify title
  expect(result).toEqual("iPhone 14 Pro Max 128GB - XuyenPham");
});

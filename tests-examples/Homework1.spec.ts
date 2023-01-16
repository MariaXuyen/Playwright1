import { test, expect } from "@playwright/test";

test("bai1", async ({ page }) => {
  await page.goto("https://accounts.shopbase.com/sign-in");

  await page.waitForLoadState("networkidle");

  await page.fill("input[name='email']", "marykimxuyen99@gmail.com");
  await page.fill("input[name='password']", "Xuyen1999@");
  await page.click("//button[@class='s-button is-primary is-fullwidth']");

  //wait to log in
  // await page.waitForTimeout(5 * 1000);

  //wait to fetching data
  // await page.waitForTimeout(10 * 1000);

  await page.click("//span[normalize-space()='Products']");

  await page.click(
    "//button[@class='s-button pull-right s-button is-primary m-l-sm is-default']"
  );

  await page.fill(
    "//input[@placeholder='Short Sleeve T-Shirt']",
    "iPhone 14 Pro Max 128GB - XuyenPham"
  );

  await page.fill("//input[@id='price']", "1500");

  await page.fill("//input[@id='compare_price']", "2000");

  await page.click("//a[normalize-space()='Add variant']");

  // await page.clear("//input[@id='option-name']]");

  await page.fill(
    "//input[@placeholder='Separate options with comma']",
    "Space black"
  );
  await page.keyboard.press("Enter");

  await page.fill(
    "//input[@placeholder='Separate options with comma']",
    "Silver"
  );
  await page.keyboard.press("Enter");

  await page.fill(
    "//input[@placeholder='Separate options with comma']",
    "Gold"
  );
  await page.keyboard.press("Enter");

  await page.fill(
    "//input[@placeholder='Separate options with comma']",
    "Deep Purple"
  );
  await page.keyboard.press("Enter");

  await page.click("//button[normalize-space()='Save changes']");

  await page.waitForTimeout(3 * 1000);

  await page.click(
    "//a[@class='router-link-active']//span[contains(text(),'Products')]"
  );

  await page.click(
    "//section[1]/div[1]/div[4]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/a[1]"
  );

  await page.click("//a[contains(@class,'s-button is-outline is-small')]");

  const result = await page
        .locator(
            "h4 d-block product__name mt0 mb12 product__name-product"
        )
        .textContent();

    // Verify title
    expect(result).toEqual("iPhone 14 Pro Max 128GB - XuyenPham");

  // const optionCount = await page.locator("//button[@class='product__option']").count();// đếm số phần tử

  const optionLocators = await page
    .locator("//button[contains(@class, 'product__option')]")
    .all();

  const CreatedOptions = ["Space black", "Silver", "Gold", "Deep Purple"];

  for (let i = 0; i < optionLocators.length; i++) {
    const optionText = await optionLocators[i].textContent();
    console.log(optionText);
  }
});

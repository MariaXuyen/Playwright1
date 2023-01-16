import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://www.shopbase.com/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/ShopBase/); // có 2 dấu / là bao gồm, ko có / nghĩa là giống y nghuyên
// });
test('exam', async ({ page }) => {
  
  await page.goto('https://hiendo2.sbprod.tk/collections/jeans/products/lee-straight-jean');

  await page.waitForTimeout(3 * 1000);

  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  await page.click("//button[@id='add-to-cart']");
  
  console.log('Add  to cart'); 
 // toi trang Gio hang
  await page.goto('https://hiendo2.sbprod.tk/cart');

  //get cart number 
  const quantity = await page.inputValue("//input[@class='quantity__num']");
  //console.log(quantity);

  expect(quantity).toEqual("1");


  const price = await page.locator("//p[@class='h5 product-cart__price']//span").textContent();
  //console.log(price);

  expect(price).toEqual("$188.00");


  // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
});

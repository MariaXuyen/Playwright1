import { expect, Locator, Page } from "@playwright/test";

export class Checkout {
  page: Page;
  //   addToCart: Locator;
  //   checkoutButton: Locator;
  //   emailCheckout: Locator;
  //   lastName: Locator;

  constructor(page: Page) {
    this.page = page;

    // this.addToCart = this.page.locator(
    //   "//span[normalize-space()='Create discount']"
    // );

    //     this.checkoutButton = this.page.locator("//button[normalize-space()='Checkout']");
    //     this.emailCheckout = this.page.locator("//input[@id='checkout_shipping_address_email']");
    //     this.lastName = this.page.locator("//input[@id='checkout_shipping_address_last_name']");
    //     this.address = this.page.locator("/input[@id='checkout_shipping_address_address_line1']");
    //     this.city = this.page.locator("//input[@id='checkout_shipping_address_city']");
    //     this.phone = this.page.locator("//input[@id='checkout_shipping_address_phone']");
    //     this.inputDiscount = this.page.locator("//input[@placeholder='Enter your promotion code']");
    //     this.applyButton = this.page.locator("//button[normalize-space()='Apply']");
    //     this.continueShippingMethodButton = this.page.locator("//button[normalize-space()='Continue to shipping method']")
    //     this.contimuePaymentMethodButton = this.page.locator("//button[normalize-space()='Continue to payment method']");
    //     this.cardNumber = this.page.locator("//div[@class='fieldset stripe-form test-gateway']")
    //     .frameLocator("//div[@id='stripe-card-number']//iframe")
    //     .locator(`//input[@placeholder='Card number']`);
    //     this.cardHolderName = this.page.locator("//input[@placeholder='Cardholder name']");
    //     this.
  }

  async checkout() {
    await this.page.click("//span[normalize-space()='Add to cart']");

    // Click button Checkout
    await this.page.click("//button[normalize-space()='Checkout']");

    await this.page.waitForTimeout(5 * 1000);

    await this.page.fill(
      "//input[@id='checkout_shipping_address_email']",
      "marykimxuyen99@gmail.com"
    );

    await this.page.fill(
      "//input[@id='checkout_shipping_address_last_name']",
      "Pham"
    );

    await this.page.fill(
      "//input[@id='checkout_shipping_address_address_line1']",
      "Hanoi"
    );

    await this.page.fill(
      "//input[@id='checkout_shipping_address_city']",
      "Hanoi"
    );

    await this.page.fill(
      "//input[@id='checkout_shipping_address_phone']",
      "0123456789"
    );

    await this.page.fill(
      "//input[@placeholder='Enter your promotion code']",
      "OCG_2023_TALENT"
    );

    await this.page.click("//button[normalize-space()='Apply']");

    //Continue to shipping method

    await this.page.click(
      "//button[normalize-space()='Continue to shipping method']"
    );

    await this.page.waitForTimeout(4000);

    await this.page
      .locator("//div[@class='fieldset stripe-form test-gateway']")
      .frameLocator("//div[@id='stripe-card-number']//iframe")
      .locator(`//input[@placeholder='Card number']`)
      .fill("4242424242424242");

    await this.page
      .locator("//input[@placeholder='Cardholder name']")
      .fill("Xuyen");

    await this.page
      .locator("//div[@class='fieldset stripe-form test-gateway']")
      .frameLocator("//div[@id='stripe-card-expiry']//iframe")
      .locator(`//input[@placeholder='MM/YY']`)
      .fill("0326");

    await this.page
      .locator("//div[@class='fieldset stripe-form test-gateway']")
      .frameLocator("//div[@id='stripe-card-cvc']//iframe")
      .locator("//input[@placeholder='CVV']")
      .fill("111");

    await this.page
      .locator("//button[normalize-space()='Complete order']")
      .click();

    const totalPrice = await this.page
      .locator("//span[@class='payment-due__price']")
      .textContent();

    expect(totalPrice).toEqual("$1,356.99");
  }
}

import { test as base, expect } from '@playwright/test'
import { Login } from '../page/Authentication/Login.page'
import { ProductPage } from '../page/dashboard/product.page'

const test = base.extend<{productPage: ProductPage}>({
    productPage: async( {page}, use) => {
        // Login vao dashboard
        const loginPage = new Login(page);
        const productPage = new ProductPage(page);

        await loginPage.gotoAdmin();
        await loginPage.login();
        await loginPage.timeOut();

        await productPage.navigateToMenu("Products");
        await page.waitForLoadState("networkidle");

        // use
        await use(productPage);

        // after - delete product

    }
})

export {
    test,
    expect
};
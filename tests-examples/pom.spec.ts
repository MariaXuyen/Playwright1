import { login } from "./scr/page/Authentication/Login.page";
import {test} from "@playwright/test";

test('loginScreen', async ({page, context}) =>{
    const loginScreen = new login(page);
    await loginScreen.gotoAdmin();
    await loginScreen.timeOut();
    await loginScreen.login();
}                                                             
);


// Import POM
import { test as base } from '@playwright/test'
import { TodoPage } from "../src/page/demo/todo.page";

// Tao fixture
const test = base.extend<{ todoPage: TodoPage}>({
    todoPage: async({page}, use) => {
        const todoPage = new TodoPage(page);
        await todoPage.goto();
        await todoPage.addToDo('item1');
        await todoPage.addToDo('item2');
        console.log('Chạy code trước khi dùng use')

        await use(todoPage);

        console.log('Chạy code sau khi dùng use');
        await todoPage.removeAll();
    }
});

// Su dung fixture
// Before
// After
test('test_01', async ({todoPage}) => {
    console.log('Chạy code trong test case');
    todoPage.addToDo('my item');
})

export default test;
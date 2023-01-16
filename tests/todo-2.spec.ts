import test from './todo.spec';

test('test_02', async ({ todoPage }) => {
    console.log('Run code in test_02')
    todoPage.addToDo('Xuyen')
})
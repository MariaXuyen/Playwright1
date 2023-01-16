import { Page } from "@playwright/test";

export class TodoPage {
  page: Page;
  todos: string[];

  constructor(page: Page) {
    this.page = page;
    this.todos = [];
  }

  goto() {
    // console.log('Go to todo homepage');
  }

  addToDo(name: string) {
    this.todos.push(name);
    // console.log(`Added item ${name}`);
  }

  remove(name: string) {
    const index = this.todos.indexOf(name);
    if (index === -1) {
      console.log(`Not found item ${name}`);
      return;
    }
    this.todos.splice(index, 1);
    console.log(`Removed item ${name}`);
  }

  removeAll() {
    this.todos = []
    // console.log(`Removed all items`);
  }
}
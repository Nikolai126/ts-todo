import { ITodoItem } from '../types';

export default class TodoListModel {
  currentInputValue = '';

  taskList: ITodoItem[] = [];

  create(text: string) {
    const todo: ITodoItem = {
      id: Math.floor(Math.random() * 100000),
      text,
      checked: false
    };

    this.taskList.push(todo);
  }

  textChange(id: number, text: string) {
    this.taskList = this.taskList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text
        };
      } else {
        return todo;
      }
    });
  }

  toggle(id: number) {
    const index = this.taskList.findIndex((todo) => {
      return todo.id === id;
    });
    this.taskList[index].checked = !this.taskList[index].checked;
  }

  remove(id: number) {
    const todo = this.taskList.findIndex((todo) => {
      return todo.id === id;
    });
    this.taskList.splice(todo, 1);
  }

  removeAll() {
    this.taskList = this.taskList.filter((todo) => {
      if (todo.checked === false) return true;
    });
  }
}

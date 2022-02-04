import { ITodoItem, Uri } from '../types';

export default class TodoListModel {
  currentInputValue = '';

  taskList: ITodoItem[] = [];

  async create(text: string) {
    await fetch(Uri.LINK, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    });
  }

  async textChange(id: number, text: string) {
    await fetch(Uri.LINK + `${id.toString()}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    });
  }

  async toggle(id: number) {
    const todo = this.taskList.find((todo) => todo.id === id);
    await fetch(Uri.LINK + `${id.toString()}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: !todo.checked })
    });
  }

  async remove(id: number) {
    await fetch(Uri.LINK + `${id.toString()}`, {
      method: 'DELETE'
    });
  }

  async removeAll() {
    await fetch(Uri.LINK + '0', {
      method: 'DELETE'
    });
  }

  async getAll() {
    const res = await fetch(Uri.LINK);
    const data = await res.json();
    this.taskList = [...data];
  }
}

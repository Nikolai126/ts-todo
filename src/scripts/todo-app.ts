import TodoListView from './views/todo-list.view';

class TodoApp {
  start(): void {
    const view = new TodoListView(document.getElementById('root'));
    view.render();
  }
}

export default TodoApp;

export default class TodoListView {
  private static _createContainer(): HTMLElement {
    const div = document.createElement('div');
    div.classList.add('container');
    return div;
  }

  constructor(private readonly _rootElement: HTMLElement) {}

  render(): void {
    const header = document.createElement('header');
    header.classList.add('header');

    const container = TodoListView._createContainer();
    const h1 = document.createElement('h1');
    h1.classList.add('app-title');
    h1.insertAdjacentText('afterbegin', 'ToDoList');

    header.appendChild(container);
    container.appendChild(h1);
    this._rootElement.appendChild(header);
  }
}


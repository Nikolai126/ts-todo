import TodoListModel from '../models/todo-list.model';
import { Filters } from '../types';
import TodoListView from '../views/todo-list.view';

export default class TodoListController {
  private currentFilterValue: Filters = Filters.ALL;

  constructor(private readonly _todoListModel: TodoListModel, private readonly _todoListView: TodoListView) {
    _todoListView.init({
      onInput: this.actionInput.bind(this),
      onSubmit: this.actionAdd.bind(this),
      onChange: this.actionChange.bind(this),
      onDelete: this.actionRemove.bind(this),
      onCheck: this.actionToggle.bind(this),
      onAllCompleted: this.actionAllRemove.bind(this),
      onFilters: this.actionFilters.bind(this)
    });
  }

  async init(): Promise<void> {
    await this._todoListModel.getAll();
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  actionInput(value: string): void {
    this._todoListModel.currentInputValue = value;
  }

  async actionAdd(): Promise<void> {
    const text = this._todoListModel.currentInputValue.trim();
    if (text) {
      await this._todoListModel.create(text);
      await this._todoListModel.getAll();
      this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
    } else {
      return;
    }
  }

  async actionChange(id: number, text: string): Promise<void> {
    await this._todoListModel.textChange(id, text);
    await this._todoListModel.getAll();
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  async actionToggle(id: number): Promise<void> {
    await this._todoListModel.toggle(id);
    await this._todoListModel.getAll();
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  async actionRemove(id: number): Promise<void> {
    await this._todoListModel.remove(id);
    await this._todoListModel.getAll();
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  async actionAllRemove(): Promise<void> {
    await this._todoListModel.removeAll();
    await this._todoListModel.getAll();
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  actionFilters(value: Filters) {
    this.currentFilterValue = value;
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }
}

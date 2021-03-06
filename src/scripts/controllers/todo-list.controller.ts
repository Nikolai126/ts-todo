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

  init(): void {
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  actionInput(value: string): void {
    this._todoListModel.currentInputValue = value;
    console.log('value is:', value);
  }

  actionAdd(): void {
    const text = this._todoListModel.currentInputValue.trim();
    if (text) {
      this._todoListModel.create(text);
      this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
      this._todoListModel.currentInputValue = '';
    }
  }

  actionChange(id: number, text: string): void {
    this._todoListModel.textChange(id, text);
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  actionToggle(id: number): void {
    this._todoListModel.toggle(id);
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  actionRemove(id: number): void {
    this._todoListModel.remove(id);
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  actionAllRemove(): void {
    this._todoListModel.removeAll();
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  actionFilters(value: Filters) {
    this.currentFilterValue = value;
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }
}

import TodoListModel from "../models/todo-list.model";
import { Filters, ITodoItem } from "../types";
import TodoListView from "../views/todo-list.view";


export default class TodoListController {

    private currentFilterValue: Filters = Filters.ALL;



    constructor(
            private readonly _todoListModel: TodoListModel, 
            private readonly _todoListView: TodoListView
        ) { 
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

        init(): void  {
            this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
        }

        actionInput(value:string):void {
            this._todoListModel.currentInputValue = value;
            console.log('value is:', value);
        }

        actionAdd(): void {
            const text = this._todoListModel.currentInputValue.trim();
            if(text){
                this._todoListModel.create(text);
                this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
            }
        }

        actionChange(id: number, text:string): void {
            this._todoListModel.taskList = this._todoListModel.taskList.map(todo => {
                if(todo.id === id){
                    return {
                        ...todo,
                        text
                    }
                } else {
                    return todo
                }
            })
            this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue)
        }

        actionToggle(id: number): void {
            const index = this._todoListModel.taskList.findIndex( (todo) => {return todo.id === id});
            this._todoListModel.taskList[index].checked = !this._todoListModel.taskList[index].checked;
            this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
        }

        actionRemove(id: number): void {            
            const todo = this._todoListModel.taskList.findIndex( (todo) => {
                return todo.id === id
            });
            this._todoListModel.taskList.splice(todo, 1);
            this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
        }

        actionAllRemove(checked: boolean): void {
            this._todoListModel.taskList = this._todoListModel.taskList.filter( (todo) => {if (todo.checked === false) return true});
            this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
        }

        actionFilters(value: Filters) {
            this.currentFilterValue = value;
            this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
        }
}
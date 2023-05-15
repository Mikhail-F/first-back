import { RequestEditTodoModel } from "../models/requestEditTodoModel";
import { TodoModel } from "../models/todoModel";

export class DB {
  todoList: TodoModel[] = [];

  removeItem(id: number) {
    this.todoList = this.todoList.filter((el) => el.id != id);
  }

  editItem(item: RequestEditTodoModel) {
    this.todoList.map((el) => {
      if (el.id === item.id) el.title = item.title;
      return el;
    });
  }
}

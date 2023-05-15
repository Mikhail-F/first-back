import { Router, Request, Response } from "express";
import { DB } from "../db/db";
import { TodoModel } from "../models/todoModel";
import { RequestWithBody, RequestWithQuery } from "../models/types";
import { RequestAddTodoModel } from "../models/requestAddTodoModel";
import { RequestRemoveTodoModel } from "../models/requestRemoveTodoModel";
import { log } from "console";
import { RequestEditTodoModel } from "../models/requestEditTodoModel";

export const todoRoutes = Router();
const db = new DB();

todoRoutes.get("/", (req: Request, res: Response) => {
  log(req.headers);
  res.status(200).send(db.todoList);
});

todoRoutes.post(
  "/add",
  (req: RequestWithBody<RequestAddTodoModel>, res: Response) => {
    var requestBody = req.body;
    if (requestBody.title) {
      var newTodo: TodoModel = {
        id: Math.floor(Math.random() * 10000000000),
        title: requestBody.title,
      };
      db.todoList.push(newTodo);
      res.status(200).send(newTodo);
    } else {
      res
        .status(404)
        .json({ error: "Ошибка добавления задачи, нет поля title" });
    }
  }
);

todoRoutes.delete(
  "/remove",
  (req: RequestWithQuery<RequestRemoveTodoModel>, res: Response) => {
    var requestQuery = req.query;

    if (requestQuery.id) {
      const removeId = Number.parseInt(requestQuery.id);
      db.removeItem(removeId);
      res.status(200).send();
    } else {
      res.status(404).json({ error: "Ошибка удаления задачи, нет поля id" });
    }
  }
);

todoRoutes.post(
  "/edit",
  (req: RequestWithBody<RequestEditTodoModel>, res: Response) => {
    var requestBody: RequestEditTodoModel = req.body;

    if (requestBody) {
      db.editItem(requestBody);
      res.status(200).send();
    } else {
      res
        .status(404)
        .json({ error: "Ошибка изменения задачи, нет поля title" });
    }
  }
);

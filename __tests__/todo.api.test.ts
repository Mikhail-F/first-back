import request from "supertest";
import { app } from "../src/app";
import { TodoModel } from "../src/models/todoModel";
import { RequestAddTodoModel } from "../src/models/requestAddTodoModel";
import { log } from "console";

describe("/todo", () => {
  it("Получение массива задач", async () => {
    await request(app).get("/todo").expect(200);
  });

  it("Добавление задачи", async () => {
    const testItem: RequestAddTodoModel = { title: "Test todo add item" };
    var result = await request(app)
      .post("/todo/add")
      .send(testItem)
      .expect(200);

    var todoItem: TodoModel = result.body;

    const allTodos: TodoModel[] = (await request(app).get("/todo").expect(200))
      .body;
    expect(todoItem).toEqual(allTodos.pop());
  });

  it("Редактирование задачи", async () => {
    const allTodos: TodoModel[] = (await request(app).get("/todo").expect(200))
      .body;
    const idTodoForEdit = allTodos[0];
    await request(app)
      .post("/todo/edit")
      .send({ id: idTodoForEdit.id, title: "fowwofjfwjowfj" })
      .expect(200);
  });

  it("Удаление задачи", async () => {
    const allTodos: TodoModel[] = (await request(app).get("/todo").expect(200))
      .body;
      log(allTodos)
    const idTodoForRemove = allTodos[0].id;
    await request(app)
      .delete("/todo/remove?id=" + idTodoForRemove)
      .expect(200);
  });
});

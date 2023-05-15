"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
describe("/todo", () => {
    it("Получение массива задач", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get("/todo").expect(200);
    }));
    it("Добавление задачи", () => __awaiter(void 0, void 0, void 0, function* () {
        const testItem = { title: "Test todo add item" };
        var result = yield (0, supertest_1.default)(app_1.app)
            .post("/todo/add")
            .send(testItem)
            .expect(200);
        var todoItem = result.body;
        const allTodos = (yield (0, supertest_1.default)(app_1.app).get("/todo").expect(200))
            .body;
        expect(todoItem).toEqual(allTodos.pop());
    }));
    it("Удаление задачи", () => __awaiter(void 0, void 0, void 0, function* () {
        const allTodos = (yield (0, supertest_1.default)(app_1.app).get("/todo").expect(200)).body;
        const idTodoForRemove = allTodos[0].id;
        yield (0, supertest_1.default)(app_1.app).delete("/todo/remove?id=" + idTodoForRemove).expect(200);
    }));
});

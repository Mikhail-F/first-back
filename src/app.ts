import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { todoRoutes } from "./routes/todo-routes";

export const app = express();

const parserMiddleware = bodyParser({});
app.use(parserMiddleware);

app.use("/todo", todoRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({"title": "Work"});
});

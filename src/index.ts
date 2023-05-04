import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

var products = [{ title: "tomato" }, { title: "orange" }];

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get("/", (req: Request, res: Response) => {
  let helloMessage = "Hello World!";
  res.send(helloMessage);
});

app.get("/products", (req: Request, res: Response) => {
  let name = req.query.name?.toString();
  let message = req.query.name
    ? products.filter((p) => p.title.includes(name!))
    : products;
  res.send(message);
});

app.get("/products/:productTitle", (req: Request, res: Response) => {
  let product = products.find((p) => p.title === req.params.productTitle);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

app.delete("/products/:title", (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].title === req.params.title) {
      products.splice(i, 1);
      res.send(204);
      return;
    }
  }
  res.send(404);
});

app.post("/products", (req: Request, res: Response) => {
  let productTitle = req.body.title;
  if (productTitle) {
    let newProduct = { title: productTitle }
    products.push(newProduct);
    res.status(201).send(newProduct);
  } else {
    res.send(404);
  }
});

app.put("/products/:productTitle", (req: Request, res: Response) => {
  let product = products.find((p) => p.title === req.params.productTitle);
  if (product) {
    product.title = req.params.productTitle + " Edit"
    res.send(product)
  } else {
    res.send(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

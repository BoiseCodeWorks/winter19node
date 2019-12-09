import express from "express";
import bp from "body-parser";
import TodoController from "./controllers/TodoController";

let server = express();

server.use(bp.urlencoded({ extended: true }));
server.use(bp.json());

server.get("", (request, response) => {
  console.log("Hello Request");
  response.send({ message: "got request", data: { greeting: "hello world" } });
});

server.use("/todos", new TodoController().router);

server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } });
});

server.use((req, res) => {
  res.status(404).send({ Message: "No such Route" });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000.... you better go catch it");
});

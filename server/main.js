import express from "express";
import bp from "body-parser";
import cors from "cors";
import TodoController from "./controllers/TodoController";

let server = express();

server.use(express.static(__dirname + "/../client"));

var whitelist = ["http://localhost:8080"];
var corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions));

server.use(bp.urlencoded({ extended: true }));
server.use(bp.json());

server.use("/api/todos", new TodoController().router);

server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } });
});

server.use((req, res) => {
  res.status(404).send({ Message: "No such Route" });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000.... you better go catch it");
});

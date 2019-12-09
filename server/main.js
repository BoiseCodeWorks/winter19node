import express from "express";

let server = express();

server.get("", (request, response) => {
  console.log("Hello Request");
  response.send({ message: "got request", data: { greeting: "hello world" } });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000.... you better go catch it");
});

import express from "express";
import ApiError from "../utils/ApiError";

let _badData = [
  {
    description: "hello",
    completed: false
  }
];

export default class TodoController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:index", this.getById)
      .post("", this.create);
  }

  getAll(req, res, next) {
    res.send(_badData);
  }

  getById(req, res, next) {
    try {
      let index = req.params.index;
      if (index > -1 && index < _badData.length) {
        res.send(_badData[index]);
      }
      throw new ApiError("BadId");
    } catch (error) {
      next(error);
    }
  }

  create(req, res, next) {
    _badData.push(req.body);
    res.status(201).send("Success");
  }
}

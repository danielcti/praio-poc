const express = require("express");
const UserController = require("./controllers/UserController");

const routes = new express.Router();

routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.put("/user", UserController.update);
routes.get("/user/:id", UserController.show);

module.exports = routes;

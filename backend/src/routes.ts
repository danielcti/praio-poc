import { Router } from "express";
import UserController from "./controllers/UserController";

const routes = Router();

routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.put("/user", UserController.update);
routes.get("/user/:id", UserController.show);
routes.delete("/user/:id", UserController.delete);

export default routes;

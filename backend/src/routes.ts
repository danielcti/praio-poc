import { Router } from "express";
import UserController from "./controllers/UserController";
import AccountController from "./controllers/AccountController";
import VerifyJWT from "./middleware/authentication";

const routes = Router();

routes.post("/account/register", AccountController.register);
routes.post("/account/login", AccountController.login);
routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.put("/user", UserController.update);
routes.get("/user/:id", UserController.show);
routes.delete("/user/:id", UserController.delete);

routes.get("/account/testLogin", VerifyJWT, AccountController.testLogin);

export default routes;

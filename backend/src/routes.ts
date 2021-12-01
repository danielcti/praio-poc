import { Router } from "express";
import UserController from "./controllers/UserController";
import AccountController from "./controllers/AccountController";
import FoodController from "./controllers/FoodController";
import OrderController from "./controllers/OrderController";
import VerifyJWT from "./middleware/authentication";

const routes = Router();

routes.post("/account/register", AccountController.register);
routes.post("/account/login", AccountController.login);
routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.put("/user", UserController.update);
routes.get("/user/:id", UserController.show);
routes.delete("/user/:id", UserController.delete);
routes.post("/order/create", OrderController.create);

routes.get("/account/testLogin", VerifyJWT, AccountController.testLogin);

routes.post("/add-food", VerifyJWT, FoodController.add);
routes.get("/food/:id", FoodController.get);
routes.delete("/food/:id", VerifyJWT, FoodController.delete);
routes.get("/merchant-foods/:id", FoodController.getMerchantFoods);
routes.put("/food", VerifyJWT ,FoodController.update);

export default routes;

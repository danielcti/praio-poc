import { Router } from "express";
import UserController from "./controllers/UserController";
import AccountController from "./controllers/AccountController";
import FoodController from "./controllers/FoodController";
import OrderController from "./controllers/OrderController";
import RatingController from "./controllers/RatingController";
import VerifyJWT from "./middleware/authentication";

const routes = Router();

routes.post("/account/register", AccountController.register);
routes.post("/account/login", AccountController.login);
routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.put("/user", UserController.update);
routes.get("/user/:id", UserController.show);
routes.delete("/user/:id", UserController.delete);
routes.post("/user/socket", UserController.updateUserSocketId);

routes.post("/order/create", OrderController.create);
routes.put("/order/accept", OrderController.accept);
routes.put("/order/cancel", OrderController.cancel);
routes.put("/order/finish", OrderController.finish);
routes.get("/order/list", OrderController.list);

routes.get("/account/testLogin", VerifyJWT, AccountController.testLogin);

routes.post("/add-food", VerifyJWT, FoodController.add);
routes.get("/food/:id", FoodController.get);
routes.delete("/food/:id", VerifyJWT, FoodController.delete);
routes.get("/merchant-foods/:id", FoodController.getMerchantFoods);
routes.put("/food", VerifyJWT, FoodController.update);
routes.get("/food", VerifyJWT, FoodController.list);

routes.post("/rating/new", RatingController.create);
routes.get("/rating", RatingController.getStars);

export default routes;

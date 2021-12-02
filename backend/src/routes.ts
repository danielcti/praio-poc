import { Router } from "express";
import UserController from "./controllers/UserController";
import AccountController from "./controllers/AccountController";
import FoodController from "./controllers/FoodController";
import VerifyJWT from "./middleware/authentication";
import { client } from ".";
import { Food } from "./models/Food";

const routes = Router();

routes.post("/account/register", AccountController.register);
routes.post("/account/login", AccountController.login);

routes.get("/account/testLogin", VerifyJWT, AccountController.testLogin);

routes.post("/add-food", VerifyJWT, FoodController.add);
routes.get("/food/:id", FoodController.get);
routes.delete("/food/:id", VerifyJWT, FoodController.delete);
routes.get("/merchant-foods/:id", FoodController.getMerchantFoods);
routes.put("/food", VerifyJWT, FoodController.update);

// TODO - depois tirar isso aqui
routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.put("/user", UserController.update);
routes.get("/user/:id", UserController.show);
routes.delete("/user/:id", UserController.delete);
routes.get("/food", async (req: any, res: any) => {
  const query = await client.query(`SELECT * FROM FOODS`);

  const foods = <Food[]>query.rows;

  return res.json(foods);
});

export default routes;

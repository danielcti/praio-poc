import { Request, Response } from "express";

import { Food } from "../models/Food";
import FoodRepository from "../repositories/FoodRepository";

class FoodController {
    async add(request: Request, response: Response) {
        const food:Food = request.body;

        if (request.body.is_client)
        {
            return response.status(401).send({ error: "Client cannot add a food"})
        }

        if (!food.name || !food.price || !food.description || !food.category)
        {
            return response.status(400).send({ error: "Request was incomplete" });
        }

        food.merchant_id = request.body.user_id;

        const food_id = await FoodRepository.Add(food)

        if (food_id >= 0) 
        {
            food.id = food_id;
            return response.status(200).send({ success: "Food was added", food });
        } else {
            return response.status(500).send({ error: "Something went wrong" });
        }
    }

    async get(request: Request, response: Response) {
        const { id } = request.params;
        const food = await FoodRepository.FindFoodById(Number(id));
        if (!food) {
            return response.status(500).send({ error: `Unable to find food with id = ${id}`})
        }
        return response.status(200).send({food});
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const { user_id } = request.body;
        
        const food = await FoodRepository.FindFoodById(Number(id));
        if (food?.merchant_id != user_id) {
            return response.status(401).send({ error: "user cannot delete this food"})
        }

        const foodWasDeleted = await FoodRepository.Delete(Number(id));

        if (!foodWasDeleted) {
            return response.status(500).send({ error: `Unable to delete food with id = ${id}`})
        }
        return response.status(200).send({sucess: "Food was deleted" });
    }

    async getMerchantFoods(request: Request, response: Response) {
        const { id } = request.params;

        const foods = await FoodRepository.FindFoodsByMerchantId(Number(id));

        return response.status(200).send({ foods});
    }

    async update(request: Request, response: Response) {
        const food:Food = request.body;
        const { user_id } = request.body;

        if (food.merchant_id != user_id) {
            return response.status(401).send({ error: "user cannot update this food"})
        }

        if (!food.name || !food.price || !food.description || !food.category)
        {
            return response.status(400).send({ error: "Request was incomplete" });
        }

        const newFood = await FoodRepository.Update(food);

        if (!newFood) {
            return response.status(500).send({ error: `Unable to update food with id = ${food.id}`})
        } else {
            return response.status(200).send({newFood});
        }
    }
}

export default new FoodController();
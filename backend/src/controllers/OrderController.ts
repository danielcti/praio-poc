import { Request, Response } from "express";
import { client, io } from "../index";

import { Order } from "../models/Order";
import OrderRepository from "../repositories/OrderRepository";

class OrderController {

    async create(request: Request, response: Response) {
        const order: Order = request.body;

        const createdOrder = await OrderRepository.CreateOrder(order)
        if (createdOrder) {
            return response.status(200).send({ success: "Order created", order: createdOrder });
        }
        else {
            return response.status(500).send({ error: "Something went wrong" });
        }
    }
}

export default new OrderController();
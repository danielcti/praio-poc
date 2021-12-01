import { Request, Response } from "express";
import { client, io } from "../index";

import OrderRepository from "../repositories/OrderRepository";

class OrderController {

    async create(request: Request, response: Response) {
        const { order } = request.body;

        if (await OrderRepository.CreateOrder(order)) {
            return response.status(200).send({ success: "Order created", order: order });
        }
        else {
            return response.status(500).send({ error: "Something went wrong" });
        }
    }
}

export default new OrderController();
import { Request, Response } from "express";
import { client, io } from "../index";

import { Order } from "../models/Order";
import OrderRepository from "../repositories/OrderRepository";

class OrderController {
  async create(request: Request, response: Response) {
    const order: Order = request.body;

    const createdOrder = await OrderRepository.CreateOrder(order);
    const { rows } = await client.query(
      `SELECT * FROM users WHERE id = ${createdOrder?.merchant_id};`
    );
    if (createdOrder) {
      io.to(rows[0].socket_id).emit("new_order", createdOrder);
      return response
        .status(200)
        .send({ success: "Order created", order: createdOrder });
    } else {
      return response.status(500).send({ error: "Something went wrong" });
    }
  }

  async list(request: Request, response: Response) {
    const { client_id, merchant_id, status } = request.body;
    let orders = undefined;

    const user_id = Number(client_id) ? Number(client_id) : Number(merchant_id);
    const is_merchant = client_id == undefined && merchant_id != undefined;

    if (user_id) {
      if (status) {
        orders = await OrderRepository.FindOrdersByStatusFromId(
          user_id,
          is_merchant,
          status
        );
      } else {
        orders = await OrderRepository.FindOrdersByUserId(user_id, is_merchant);
      }
    }

    if (orders) {
      return response.status(200).send(orders);
    } else {
      return response.status(500).send({ error: "Something went wrong" });
    }
  }

  async accept(request: Request, response: Response) {
    const controller = new OrderController();
    return await controller.changeStatus("ongoing", request, response);
  }

  async cancel(request: Request, response: Response) {
    const controller = new OrderController();
    return await controller.changeStatus("canceled", request, response);
  }

  async finish(request: Request, response: Response) {
    const controller = new OrderController();
    return await controller.changeStatus("finished", request, response);
  }

  private async changeStatus(
    status: string,
    request: Request,
    response: Response
  ) {
    const { id, listener_id } = request.query;
    const order_id = Number(id);
    if (!order_id)
      return response.status(400).json({ error: "Invalid fields" });

    const order = await OrderRepository.SetOrderStatus(order_id, status);
    const { rows } = await client.query(
      `SELECT * FROM users WHERE id = ${listener_id};`
    );
    if (order) {
      io.to(rows[0].socket_id).emit("updated_order", order);
      return response
        .status(200)
        .send({ success: "Order status is now " + status, order: order });
    } else {
      return response.status(500).send({ error: "Something went wrong" });
    }
  }
}

export default new OrderController();

import { Order, UserOrder } from "../models/Order";
import { client } from "../index";

import UserRepository from "../repositories/UserRepository";
import FoodRepository from "../repositories/FoodRepository";

class OrderRepository {
  async FindOrdersByUserId(
    user_id: number,
    is_merchant: boolean
  ): Promise<UserOrder[] | undefined> {
    try {
      const user_id_key = is_merchant ? "merchant_id" : "client_id";
      const query = await client.query(
        `SELECT O.* ,U.name AS merchant_name, U2.name as client_name ,F.name as food_name, total_price, status, quantity
        FROM ORDERS O
        INNER JOIN FOODS F
            ON O.food_id = F.id
        INNER JOIN USERS U
            ON O.merchant_id = U.id
        INNER JOIN USERS U2
            ON O.client_id = U2.id
        WHERE O.${user_id_key} = ${user_id}
        ORDER BY O.time_ordered DESC;`
      );

      const orders = <UserOrder[]>query.rows;

      return orders;
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
    }
    return undefined;
  }

  async FindOrdersByStatusFromId(
    user_id: number,
    is_merchant: boolean,
    status: string
  ): Promise<Order[] | undefined> {
    try {
      const user_id_key = is_merchant ? "merchant_id" : "client_id";
      const query = await client.query(
        `SELECT * FROM ORDERS WHERE ${user_id_key} = ${user_id} AND status = '${status}';`
      );

      return query.rows;
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
    }
    return undefined;
  }

  async SetOrderStatus(id: number, status: string): Promise<Order | undefined> {
    try {
      let params = `status = '${status}'`;
      if (status == "finished") {
        params = `(status,time_delivered) = ('${status}','${new Date().toUTCString()}')`;
      }

      const query = await client.query(
        `UPDATE orders SET ${params} WHERE id = ${id} RETURNING *;`
      );

      return query.rows[0];
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
    }
    return undefined;
  }

  async CreateOrder(order: Order): Promise<Order | undefined> {
    try {
      const buyer = await UserRepository.FindUserById(order.client_id || -1);
      const merchant = await UserRepository.FindUserById(
        order.merchant_id || -1
      );
      const food = await FoodRepository.FindFoodById(order.food_id || -1);

      if (!buyer || !merchant || !food) return undefined;

      const query =
        await client.query(`INSERT INTO ORDERS(merchant_id,client_id,food_id,status,total_price,payment_method,time_ordered)\
                VALUES('${order.merchant_id}','${order.client_id}','${
          order.food_id
        }','open','${(food.price || 0) * (order.quantity || 0)}','${
          order.payment_method
        }','${new Date().toUTCString()}') RETURNING *;`);

      return query.rows[0];
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
    }
    return undefined;
  }
}

export default new OrderRepository();

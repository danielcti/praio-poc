import { Order } from "../models/Order";
import { client } from "../index";

import UserRepository from "../repositories/UserRepository";
import FoodRepository from "../repositories/FoodRepository";

class OrderRepository {

    async FindOrderById(id: number): Promise<Order | undefined> {

        try {
            const query = await client.query(`SELECT * FROM ORDERS WHERE id = ${id}`);

            if (query.rows.length == 0) {
                return undefined;
            }
            else {
                return <Order>query.rows[0];
            }
        } catch (err) {
            console.log((err as Error).message)
            console.log((err as Error).stack)
        }

        return undefined;
    }

    async FindOrdersByClientId(client_id: number): Promise<Order[] | undefined> {
        try {
            const query = await client.query(`SELECT * FROM ORDERS WHERE client_id = '${client_id}'`);

            const orders = <Order[]>query.rows;

            return orders;
        } catch (err) {
            console.log((err as Error).message)
            console.log((err as Error).stack)
        }
        return undefined;
    }

    async FindOrdersByMerchantId(merchant_id: number): Promise<Order[] | undefined> {
        try {
            const query = await client.query(`SELECT * FROM ORDERS WHERE merchant_id = '${merchant_id}'`);

            const orders = <Order[]>query.rows;

            return orders;
        } catch (err) {
            console.log((err as Error).message)
            console.log((err as Error).stack)
        }
        return undefined;
    }

    async CreateOrder(order: Order): Promise<boolean> {
        try {
            const buyer = await UserRepository.FindUserById(order.client_id || -1)
            const merchant = await UserRepository.FindUserById(order.merchant_id|| -1)
            const food = await FoodRepository.FindFoodById(order.food_id || -1) 

            if (!buyer || !merchant || !food) { return false }

            await client.query(`INSERT INTO ORDERS(merchant_id,client_id,food_id,status,total_price,payment_method,time_ordered)\
                VALUES('${order.merchant_id}','${order.client_id}','${order.food_id}','open','${(food.price || 0)*(order.quantity || 0)}','${new Date()}')`)

            return true;

        } catch(err) {
            console.log((err as Error).message)
            console.log((err as Error).stack)
        }
        return false;
    }
}

export default new OrderRepository()
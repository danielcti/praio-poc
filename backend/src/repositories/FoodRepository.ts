import { Food } from "../models/Food";
import { client } from "../index";

class FoodRepository {
  async Add(food: Food): Promise<number> {
    try {
      const query =
        await client.query(`INSERT INTO FOODS(name,price,description,category,merchant_id)\
            values ('${food.name}', ${food.price}, '${food.description}', '${food.category}', ${food.merchant_id}) RETURNING id`);

      return query.rows[0].id;
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
      return -1;
    }
  }

  async FindFoodById(id: number): Promise<Food | undefined> {
    try {
      const query = await client.query(`SELECT * FROM FOODS WHERE id = ${id}`);
      return query.rows[0];
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
      return undefined;
    }
  }

  async Delete(id: number): Promise<boolean> {
    try {
      await client.query(`DELETE FROM FOODS WHERE id = ${id}`);
      return true;
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
      return false;
    }
  }

  async FindFoodsByMerchantId(id: number): Promise<Food[]> {
    try {
      const query = await client.query(
        `SELECT * FROM FOODS WHERE merchant_id = ${id}`
      );
      return query.rows;
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
      return [];
    }
  }

  async Update(food: Food): Promise<Food | undefined> {
    try {
      const query = await client.query(`UPDATE FOODS SET\
                name = '${food.name}',
                price = ${food.price},
                description = '${food.description}',
                category = '${food.category}'
                WHERE id = ${food.id} RETURNING *`);

      return query.rows[0];
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
      return undefined;
    }
  }

  async FindAll(): Promise<Food[] | undefined> {
    try {
      const query = await client.query(`SELECT * FROM FOODS;`);

      return query.rows;
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
      return undefined;
    }
  }
}

export default new FoodRepository();

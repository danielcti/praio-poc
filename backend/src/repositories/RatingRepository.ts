import { Rating } from "../models/Rating";
import { client } from "../index";

import UserRepository from "../repositories/UserRepository";

class RatingRepository {

    async MerchantStarsById(merchant_id: number): Promise<Number> {
        try {
            const query = await client.query(
                `SELECT AVG(stars) FROM RATINGS WHERE merchant_id = ${merchant_id};`
            );

            console.log(query)
            return Number(query.rows[0]["avg"]);
        } catch (err) {
            console.log((err as Error).message)
            console.log((err as Error).stack)
        }
        return 0;
    }

    async CreateRating(rating: Rating): Promise<Rating | undefined> {
        try {
            const buyer = await UserRepository.FindUserById(rating.client_id || -1)
            const merchant = await UserRepository.FindUserById(rating.merchant_id || -1)

            if (!buyer || !merchant) return undefined;

            const query = await client.query(`INSERT INTO RATINGS(merchant_id,client_id,stars,date)\
                VALUES('${rating.merchant_id}','${rating.client_id}','${rating.stars}','${(new Date()).toUTCString()}') RETURNING *;`)

            return query.rows[0];

        } catch(err) {
            console.log((err as Error).message)
            console.log((err as Error).stack)
        }

        return undefined;
    }
}

export default new RatingRepository()
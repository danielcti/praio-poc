import { Request, Response } from "express";

import { Rating } from "../models/Rating";
import RatingRepository from "../repositories/RatingRepository";

class RatingController {

    async create(request: Request, response: Response) {
        const rating: Rating = request.body;

        const createdRating = await RatingRepository.CreateRating(rating)
        if (createdRating) {
            return response.status(200).send({ success: "Rating created", order: createdRating });
        } else {
            return response.status(500).send({ error: "Something went wrong" });
        }
    }

    async getStars(request: Request, response: Response) {
        const { merchant_id } = request.query;
        const merchant = Number(merchant_id)
        if (!merchant) return response.status(400).json({ error: "Invalid fields" });

        const stars = await RatingRepository.MerchantStarsById(merchant)
        return response.status(200).send({ stars: stars });
    }
}

export default new RatingController();
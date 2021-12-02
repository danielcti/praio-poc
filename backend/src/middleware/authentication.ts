import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async function VerifyJWT(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization?.split(' ')[1]

    if (!token) return response.status(401).send({ auth: "false", message: "No token provided" });

    //TODO PROCESS ENV
    jwt.verify(token, "SEGREDOMUITOSECRETO", function (err: any, user: any) {

        if (err)
            return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        request.body.user_id = user.id;
        request.body.is_client = user.is_client;

        next();
    });

}
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { User } from "../models/User";
import UserRepository from "../repositories/UserRepository";

class AccountController {

    async register(request: Request, response: Response) {
        const user: User = request.body;

        if (!user.name|| !user.email || !user.password) {
            return response.status(400).send({ error: "Request was incomplete" });
        }

        if (user.is_client === undefined && user.is_merchant === undefined) {
            return response.status(400).send({ error: "Request was incomplete" });
        }

        const userWithSameEmail = await UserRepository.FindUserByEmail(user.email)

        if (userWithSameEmail) {
            return response.status(400).send({ error: "Email already registered" });
        }

        if (await UserRepository.RegisterUser(user)) {
            return response.status(200).send({ success: "User was registered", user: user });
        }
        else {
            return response.status(500).send({ error: "Something went wrong" });
        }
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        if (!email|| !password) {
            return response.status(400).send({ error: 'Request was incomplete' });
        }

        const user = await UserRepository.FindUserByEmail(email);

        if (!user) return response.status(401).send({ error: 'Invalid login' })

        //the app is just a mvp so security is not that important XD 
        if (password != user.password) {
            return response.status(401).send({ error: 'Invalid login' });
        }

        //TODO: PROCESS ENV
        const token = jwt.sign({ id: user.id, is_client: user.is_client }, "SEGREDOMUITOSECRETO");

        return response.status(200).send({ auth: true, token: token, user: user });
    }

    async testLogin(request: Request, response: Response) {
        return response.status(200).send({id: request.body.id, is_client: request.body.is_client});
    }
}

export default new AccountController();
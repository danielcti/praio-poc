import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../models/User";
import UserRepository from "../repositories/UserRepository";

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  is_client: boolean;
  is_merchant: boolean;
}

interface LoginUserRequest {
  email: string;
  password: string;
}

class AccountController {
  async register(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      is_client,
      is_merchant,
    }: RegisterUserRequest = request.body;

    if (!name || !email || !password) {
      return response.status(400).send({ error: "Request was incomplete" });
    }

    if (is_client === undefined && is_merchant === undefined) {
      return response.status(400).send({ error: "Request was incomplete" });
    }

    const userWithSameEmail = await UserRepository.FindUserByEmail(email);

    if (userWithSameEmail) {
      return response.status(400).send({ error: "Email already registered" });
    }

    const password_hash = await bcrypt.hash(password, 8);
    const createdUser = await UserRepository.RegisterUser({
      name,
      email,
      password_hash,
      is_client,
      is_merchant,
    } as User);

    if (createdUser) {
      return response
        .status(200)
        .send({ success: "User was registered", createdUser });
    } else {
      return response.status(500).send({ error: "Something went wrong" });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password }: LoginUserRequest = request.body;

    if (!email || !password) {
      return response.status(400).send({ error: "Request was incomplete" });
    }

    const user = await UserRepository.FindUserByEmail(email);

    if (!user) return response.status(401).send({ error: "Invalid login" });

    const match = await bcrypt.compare(password, String(user.password_hash));

    if (!match) {
      return response.status(401).send({ error: "Invalid login" });
    }

    //TODO: PROCESS ENV
    const token = jwt.sign(
      { id: user.id, is_client: user.is_client },
      "SEGREDOMUITOSECRETO"
    );

    return response.status(200).send({ auth: true, token: token, user: user });
  }

  async testLogin(request: Request, response: Response) {
    return response
      .status(200)
      .send({ id: request.body.user_id, is_client: request.body.is_client });
  }
}

export default new AccountController();

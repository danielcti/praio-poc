import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";

class UserController {
  async index(request: Request, response: Response) {
    const users = await UserRepository.FindAll();
    if (users) {
      return response.status(200).send(users);
    }
    return response.status(500);
  }

  async updateUserCoords(request: Request, response: Response) {
    const { id, latitude, longitude } = request.body;
    if (!id || !latitude || !longitude)
      return response.status(400).json({ error: "Invalid fields" });

    const updatedUser = await UserRepository.UpdateUserCoords(
      id,
      latitude,
      longitude
    );
    if (updatedUser) return response.status(200).send(updatedUser);

    return response.status(500);
  }

  async updateUserSocketId(request: Request, response: Response) {
    const { socketId, userId } = request.body;

    if (!socketId || !userId)
      return response.status(400).json({ error: "Invalid fields" });

    const updatedUser = await UserRepository.UpdateUserSocketId(
      socketId,
      userId
    );
    if (updatedUser) return response.status(200);

    return response.status(500);
  }
}

export default new UserController();

import { Request, Response } from "express";
import { client, io } from "../index";

class UserController {
  async index(request: Request, response: Response) {
    const users = await client.query("SELECT * FROM users;");

    return response.json(users.rows);
  }

  async store(request: Request, response: Response) {
    const { name, latitude, longitude } = request.body;
    if (!name || !latitude || !longitude)
      return response.status(400).json({ error: "Invalid fields" });

    const query = await client.query(
      `INSERT INTO users (name, latitude, longitude) VALUES ('${name}', ${latitude}, ${longitude}) RETURNING *;`
    );

    const users = await client.query("SELECT * FROM users;");
    io.emit("users", users.rows);

    return response.status(200).send(query.rows[0]);
  }

  async update(request: Request, response: Response) {
    const { id, name, latitude, longitude } = request.body;
    if (!id || !name || !latitude || !longitude)
      return response.status(400).json({ error: "Invalid fields" });

    const query = await client.query(
      `UPDATE users SET (name, latitude, longitude) = ('${name}', ${latitude}, ${longitude}) WHERE user_id = ${id} RETURNING *;`
    );

    const users = await client.query("SELECT * FROM users;");
    io.emit("users", users.rows);

    return response.status(200).send(query.rows[0]);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) return response.status(400).json({ error: "Invalid fields" });

    const users = await client.query(
      `SELECT * FROM users WHERE user_id = ${id};`
    );

    return response.json(users.rows);
  }
}

export default new UserController();

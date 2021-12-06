import { User } from "../models/User";
import { client } from "../index";

class UserRepository {
  async FindAll(): Promise<User[]> {
    try {
      const query = await client.query(`SELECT * FROM USERS`);

      const users = <User[]>query.rows;

      return users;
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
    }
    return [];
  }

  async FindUserById(id: number): Promise<User | undefined> {
    try {
      const query = await client.query(`SELECT * FROM USERS WHERE id = ${id}`);

      if (query.rows.length == 0) {
        return undefined;
      } else {
        return <User>query.rows[0];
      }
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
    }

    return undefined;
  }

  async FindUserByEmail(email: string): Promise<User | undefined> {
    try {
      const query = await client.query(
        `SELECT * FROM USERS WHERE email = '${email}'`
      );

      if (query.rows.length == 0) {
        return undefined;
      } else {
        return <User>query.rows[0];
      }
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
    }
    return undefined;
  }

  async RegisterUser(user: User): Promise<boolean> {
    try {
      if (user.is_client) {
        await client.query(`INSERT INTO USERS(name,email,password_hash,is_client,is_merchant)\
                VALUES('${user.name}','${user.email}','${user.password_hash}','t','f')`);
      }
      if (user.is_merchant) {
        await client.query(`INSERT INTO USERS(name,email,password_hash,is_client,is_merchant)\
                VALUES('${user.name}','${user.email}','${user.password_hash}','f','t')`);
      }
      return true;
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
    }
    return false;
  }

  async UpdateUserCoords(
    id: number,
    latitude: number,
    longitude: number
  ): Promise<User | undefined> {
    try {
      const query = await client.query(
        `UPDATE users SET (latitude, longitude) = (${latitude}, ${longitude}) WHERE id = ${id} RETURNING *;`
      );
      return query.rows[0];
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
      return undefined;
    }
  }

  async UpdateUserSocketId(
    socketId: string,
    userId: number
  ): Promise<User | undefined> {
    try {
      const query = await client.query(
        `UPDATE USERS SET socket_id = '${socketId}' WHERE id = ${userId} RETURNING *;`
      );
      return query.rows[0];
    } catch (err) {
      console.log((err as Error).message);
      console.log((err as Error).stack);
      return undefined;
    }
  }
}

export default new UserRepository();

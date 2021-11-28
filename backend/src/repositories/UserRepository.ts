import { User } from "../models/User";
import { client } from "../index";
import { query } from "express";

class UserRepository {

    async FindAll(): Promise<User[]> {
        try {
            const query = await client.query(`SELECT * FROM USERS`);

            const users = <User[]>query.rows;

            return users;
        } catch (err) {
            console.log((err as Error).message)
            console.log((err as Error).stack)
        }
        return []
    }

    async FindUserById(id: number): Promise<User | undefined> {

        try {
            const query = await client.query(`SELECT * FROM USERS WHERE id = ${id}`);

            if (query.rows.length == 0) {
                return undefined;
            }
            else {
                return <User>query.rows[0];
            }
        } catch (err) {
            console.log((err as Error).message)
            console.log((err as Error).stack)
        }

        return undefined;
    }

    async FindUserByEmail(email: string): Promise<User | undefined> {
        try {
            const query = await client.query(`SELECT * FROM USERS WHERE email = '${email}'`);

            if (query.rows.length == 0) {
                return undefined;
            }
            else {                
                return <User>query.rows[0];
            }
        } catch (err) {
            console.log((err as Error).message)
            console.log((err as Error).stack)
        }
        return undefined;
    }

    async RegisterUser(user: User): Promise<boolean> {

        try {
            if (user.is_client) {
                await client.query(`INSERT INTO USERS(name,email,password,is_client,is_merchant)\
                VALUES('${user.name}','${user.email}','${user.password}','t','f')`)
            }
            if (user.is_merchant) {
                await client.query(`INSERT INTO USERS(name,email,password,is_client,is_merchant)\
                VALUES('${user.name}','${user.email}','${user.password}','f','t')`)
            }
        } catch(err) {
            console.log((err as Error).message)
            console.log((err as Error).stack)
        }
        return false;
    }
}

export default new UserRepository()
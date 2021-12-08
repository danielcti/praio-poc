import express from "express";
import cors from "cors";
import { Pool } from "pg";
import routes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

const client = new Pool({
  connectionString: process.env.POSTGRES_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.use(express.json());
app.use(cors());
app.use(routes);

httpServer.listen(process.env.PORT || 3333);
console.log("App is listen on port 3333");

export { client, io };

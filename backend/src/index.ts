import express from "express";
import cors from "cors";
import { Pool } from "pg";
import routes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

const client = new Pool({
  connectionString:
    "postgres://pvkwuabszilmwb:6f5305bed79afe92966f76567bed338b3c1d36bf3bdbeee2aa244b6cfdda2ade@ec2-52-71-217-158.compute-1.amazonaws.com:5432/dast7u5c37f243",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.use(express.json());
app.use(cors());
app.use(routes);

httpServer.listen(3333);

export { client, io };

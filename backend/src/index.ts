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
    "postgres://ojfgmrsznqppqz:1b99ebe07f84dae213c8d02551df3bc98726d80859039c4848a8e10783e6e1b1@ec2-52-72-155-37.compute-1.amazonaws.com:5432/de3jsthf82fvlj",
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

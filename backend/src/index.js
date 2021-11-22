const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const { Pool } = require("pg");

const client = new Pool({
  connectionString:
    "postgres://ojfgmrsznqppqz:1b99ebe07f84dae213c8d02551df3bc98726d80859039c4848a8e10783e6e1b1@ec2-52-72-155-37.compute-1.amazonaws.com:5432/de3jsthf82fvlj",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();
module.exports = { client };

app.use((req, res, next) => {
  req.io = io; // pra todo mundo ter acesso ao socket.io

  next();
});

app.use(bodyParser());

app.use(cors());

app.use(require("./routes"));

server.listen(3333);

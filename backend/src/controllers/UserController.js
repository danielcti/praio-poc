const { client } = require("../index");

module.exports = {
  async index(req, res) {
    const users = await client.query("SELECT * FROM users;");

    return res.json(users.rows);
  },
  async store(req, res) {
    const { name, latitude, longitude } = req.body;
    if (!name || !latitude || !longitude)
      return res.status(400).json({ error: "Invalid fields" });

    const query = await client.query(
      `INSERT INTO users (name, latitude, longitude) VALUES ('${name}', ${latitude}, ${longitude}) RETURNING *;`
    );

    const users = await client.query("SELECT * FROM users;");
    req.io.emit("users", users.rows);

    return res.status(200).send(query.rows[0]);
  },
  async update(req, res) {
    const { id, name, latitude, longitude } = req.body;
    if (!id || !name || !latitude || !longitude)
      return res.status(400).json({ error: "Invalid fields" });

    const query = await client.query(
      `UPDATE users SET (name, latitude, longitude) = ('${name}', ${latitude}, ${longitude}) WHERE user_id = ${id} RETURNING *;`
    );

    const users = await client.query("SELECT * FROM users;");
    req.io.emit("users", users.rows);

    return res.status(200).send(query.rows[0]);
  },
  async show(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Invalid fields" });

    const users = await client.query(
      `SELECT * FROM users WHERE user_id = ${id};`
    );

    return res.json(users.rows);
  },
};

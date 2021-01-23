const { query } = require("../db/index");

module.exports = {
  getAllUserData: async () => {
    const sql = "SELECT * FROM users ORDER BY firstname ASC";
    const res = await query(sql);
    return res.rows;
  },

  getSpecificUser: async (data) => {
    const sql =
      "SELECT * FROM users WHERE LOWER(CONCAT(firstname, ' ', surname)) LIKE $1 ORDER BY firstname ASC";
    const res = await query(sql, [`%%${data.user.toLowerCase()}%%`]);
    return res.rows;
  },

  postNewUser: async (user) => {
    const sql =
      "INSERT INTO users (firstname, surname, address, email, phone, image, isbootcamper, industry, interests, matchedwith )  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    const res = await query(sql, [
      user.firstname,
      user.surname,
      user.address,
      user.email,
      user.phone,
      user.image,
      user.isbootcamper,
      user.industry,
      user.interests,
      user.matchedwith,
    ]);
    return res.rows;
  },

  getBootcampers: async () => {
    const sql = "SELECT * FROM users WHERE isbootcamper = true";
    const res = await query(sql);
    return res.rows;
  },

  getMentors: async () => {
    const sql = "SELECT * FROM users WHERE isbootcamper = false";
    const res = await query(sql);
    return res.rows;
  },

  deleteUser: async (id) => {
    const sql = "DELETE FROM users WHERE id = $1";
    const res = await query(sql, [id]);
    return res.rows;
  },

  patchNewMatch: async (userChanges) => {
    const sql = `
      UPDATE users
      SET
      matchedwith = $1
      WHERE id = $2
      `;
    userChanges.map(
      async (user) => await query(sql, [user.matchedwith, user.id])
    );
    return "bootcamper matched";
  },
};

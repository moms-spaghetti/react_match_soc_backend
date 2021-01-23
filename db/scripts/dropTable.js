const { query } = require("../index");

const sql = `
DROP TABLE IF EXISTS users
  `;

async function dropTable() {
  const res = await query(sql);
  console.log(res);
}

dropTable();

const { query } = require("../index");

const sql = `
  CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY, 
  firstname TEXT, 
  surname TEXT, 
  address TEXT, 
  email TEXT, 
  phone TEXT, 
  image TEXT, 
  isbootcamper BOOLEAN, 
  industry TEXT, 
  interests TEXT[], 
  matchedwith TEXT)
  `;

async function createTable() {
  const res = await query(sql);
  console.log(res);
}

createTable();

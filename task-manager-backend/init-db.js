const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const { connectionString } = require("pg/lib/defaults");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initDb() {
  const client = await pool.connect();

  try {
    const sqlFile = path.join(__dirname, "schema.sql");
    const sql = fs.readFileSync(sqlFile, "utf8");
    await client.query(sql);
    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Error initializing database", err);
  } finally {
    client.release();
  }
}

initDb();

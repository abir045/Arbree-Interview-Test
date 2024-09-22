const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const { Pool } = require("pg");
const { connectionString } = require("pg/lib/defaults");

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware

app.use(cors());
app.use(express.json());

//database connection

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl:
  //   process.env.NODE_ENV === "production"
  //     ? { rejectUnauthorized: false }
  //     : false,
});

async function getAllTasks() {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    console.log("All tasks:");
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
}

// connection check
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err);
  }
  console.log("database connection successful");
  release();
});
//get all tasks

app.get("/api/tasks", async (req, res) => {
  try {
    const result = await getAllTasks();

    return res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

getAllTasks();

async function getTaskById(id) {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      console.log("Task found:");
      console.log(result.rows[0]);
      return result.rows[0];
    } else {
      console.log("No task found with id:", id);
      return null;
    }
  } catch (err) {
    console.error("Error fetching task:", err);
    throw err;
  }
}

// GET a single task
app.get("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await getTaskById(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

getTaskById(2);

//POST a new task
app.post("/api/tasks", async (req, res) => {
  const { title, description, status, category, deadline } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, status,category, deadline) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, status, category, deadline]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT (update) a task
app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status, category, deadline } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3, category = $4, deadline = $5  WHERE id = $6 RETURNING *",
      [title, description, status, category, deadline, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a task
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

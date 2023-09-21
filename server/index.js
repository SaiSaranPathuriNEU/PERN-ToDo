const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const pool = require("./db");

//create middleware
//sets up middleware for handling Cross-Origin Resource Sharing (CORS) and parsing JSON data in an Express application.
app.use(cors());
app.use(express.json());

//building routes

//create a todo
app.post("/todo", async (req, res) => {
  try {
    console.log("todo create");
    console.log(req.body);

    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//edit todo
app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    console.log("updating todos", id, description);
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo with id:" + id + " was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete todo

app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletetingTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json("Todo with id:" + id + " was deleted!");
    console.log("deleting a with id:" + id);
  } catch (error) {
    console.log(error.message);
  }
});

//get all todo
app.get("/todos", async (req, res) => {
  try {
    console.log("Fetching all todo's");

    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(3000, () => {
  console.log("App started");
});

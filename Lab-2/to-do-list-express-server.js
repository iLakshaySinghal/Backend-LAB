// Import dependencies
const express = require("express");
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// In-memory todo list
let todos = [];

// Helper: print current todos to console
function printTodos() {
  console.log("\n📋 Current To-Do List:");
  if (todos.length === 0) {
    console.log("   (empty)");
  } else {
    todos.forEach(todo => {
      console.log(
        `   [${todo.id}] ${todo.task} - ${todo.completed ? "✅ Done" : "❌ Not Done"}`
      );
    });
  }
  console.log("---------------------------------------------------");
}

// ROUTES

// 1. Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 2. Get a todo by id
app.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

// 3. Add a new todo
app.post("/todos", (req, res) => {
  if (!req.body.task) {
    return res.status(400).json({ message: "Task is required" });
  }

  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
  };

  todos.push(newTodo);
  printTodos();
  res.status(201).json(newTodo);
});

// 4. Update a todo
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.task = req.body.task !== undefined ? req.body.task : todo.task;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

  printTodos();
  res.json(todo);
});

// 5. Delete a todo
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  const deleted = todos.splice(index, 1);
  printTodos();
  res.json(deleted[0]);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});

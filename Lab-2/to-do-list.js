// Import dependencies
const express = require("express");
const http = require("http");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Temporary in-memory list (can later replace with DB)
let todos = [];

// Helper function: print todos to console
function printTodos() {
  console.log("\n📋 Current To-Do List:");
  if (todos.length === 0) {
    console.log("   (empty)");
  } else {
    todos.forEach(todo => {
      console.log(`   [${todo.id}] ${todo.task} - ${todo.completed ? "✅ Done" : "❌ Not Done"}`);
    });
  }
  console.log("---------------------------------------------------");
}

// Routes

// 1. Get all items
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 2. Get single item by id
app.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Item not found" });
  res.json(todo);
});

// 3. Add new item
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
  printTodos(); // print after adding
  res.status(201).json(newTodo);
});

// 4. Update item (PUT)
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Item not found" });

  // update only provided fields
  todo.task = req.body.task !== undefined ? req.body.task : todo.task;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

  printTodos(); // print after updating
  res.json(todo);
});

// 5. Delete item
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  const deleted = todos.splice(index, 1);
  printTodos(); // print after deleting
  res.json(deleted[0]);
});

// Create HTTP server
const server = http.createServer(app);

// Run server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const express = require("express");
const router = express.Router();
const todoRepo = require("../repository/todoRepository");
const { protect, admin } = require("../middleware/authMiddleware");

// ✅ Get all todos (with optional pagination)
router.get("/", protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // Example: ?page=2
    const limit = parseInt(req.query.limit) || 3; // Example: ?limit=5

    // If pagination params exist → use paginated query
    if (req.query.page || req.query.limit) {
      const paginated = await todoRepo.getPaginated(page, limit);
      return res.json(paginated);
    }

    // Otherwise → return all todos
    const todos = await todoRepo.getAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get one todo by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const todo = await todoRepo.getById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error: error.message });
  }
});

// ✅ Create a new todo
router.post("/", protect, async (req, res) => {
  try {
    const todo = await todoRepo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error: error.message });
  }
});

// ✅ Update a todo
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await todoRepo.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error: error.message });
  }
});

// ✅ Delete todo (admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const deleted = await todoRepo.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
});

module.exports = router;

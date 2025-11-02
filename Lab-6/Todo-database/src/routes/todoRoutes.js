// src/routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const todoController = require("../controllers/todoController");

// Routes
router.get("/", protect, todoController.getTodos);
router.get("/:id", protect, todoController.getTodoById);
router.post("/", protect, todoController.createTodo);
router.put("/:id", protect, todoController.updateTodo);
router.delete("/:id", protect, admin, todoController.deleteTodo);

module.exports = router;

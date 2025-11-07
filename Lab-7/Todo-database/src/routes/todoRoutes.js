const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const todoController = require("../controllers/todoController");
const { validateTodo } = require("../validators/todoValidator");

router.get("/", protect, todoController.getTodos);
router.get("/:id", protect, todoController.getTodoById);
router.post("/", protect, admin, validateTodo, todoController.createTodo);
router.put("/:id", protect, admin, validateTodo, todoController.updateTodo);
router.delete("/:id", protect, admin, todoController.deleteTodo);

module.exports = router;

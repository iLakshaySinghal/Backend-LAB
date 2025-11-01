const express = require("express");
const router = express.Router();
const todoRepo = require("../repository/todoRepository");

// GET all todos
router.get("/", async (req, res) => {
  const todos = await todoRepo.getAll();
  res.json(todos);
});

// GET by ID
router.get("/:id", async (req, res) => {
  const todo = await todoRepo.getById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

// CREATE
router.post("/", async (req, res) => {
  const todo = await todoRepo.create(req.body);
  res.status(201).json(todo);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await todoRepo.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Todo not found" });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const deleted = await todoRepo.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Todo not found" });
  res.json({ message: "Todo deleted" });
});

module.exports = router;

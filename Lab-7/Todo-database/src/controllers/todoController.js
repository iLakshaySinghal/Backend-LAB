const todoRepo = require("../repository/todoRepository");

const getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    if (req.query.page || req.query.limit) {
      const paginated = await todoRepo.getPaginated(page, limit);
      return res.status(200).json(paginated);
    }

    const todos = await todoRepo.getAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching todos",
      error: error.message,
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await todoRepo.getById(req.params.id);
    if (!todo)
      return res.status(404).json({ message: "Todo not found" });

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching todo",
      error: error.message,
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = await todoRepo.create(req.body);
    res.status(201).json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating todo",
      error: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const updated = await todoRepo.update(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({
      message: "Todo updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating todo",
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deleted = await todoRepo.delete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting todo",
      error: error.message,
    });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};

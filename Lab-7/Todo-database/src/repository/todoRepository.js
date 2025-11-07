const Todo = require("../model/Todo");

class TodoRepository {
  // ✅ Get all (no pagination)
  async getAll() {
    return await Todo.find();
  }

  // ✅ Get paginated (with total count and metadata)
  async getPaginated(page = 1, limit = 3) {
    const skip = (page - 1) * limit;

    const [todos, total] = await Promise.all([
      Todo.find().skip(skip).limit(limit),
      Todo.countDocuments(),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      todos,
    };
  }

  async getById(id) {
    return await Todo.findById(id);
  }

  async create(todoData) {
    const todo = new Todo(todoData);
    return await todo.save();
  }

  async update(id, todoData) {
    return await Todo.findByIdAndUpdate(id, todoData, { new: true });
  }

  async delete(id) {
    return await Todo.findByIdAndDelete(id);
  }
}

module.exports = new TodoRepository();

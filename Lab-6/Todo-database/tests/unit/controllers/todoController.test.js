const todoController = require("../../../src/controllers/todoController");
const todoRepo = require("../../../src/repository/todoRepository");

// Mock the repository
jest.mock("../../../src/repository/todoRepository");

describe("Todo Controller - Unit Tests", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should create a new todo successfully", async () => {
    const req = { body: { title: "Test Todo", description: "Desc" } };
    const mockTodo = { _id: "1", title: "Test Todo", description: "Desc" };

    todoRepo.create.mockResolvedValue(mockTodo);

    await todoController.createTodo(req, res);

    expect(todoRepo.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockTodo);
  });

  it("should get all todos", async () => {
    const req = { query: {} };
    const mockTodos = [{ _id: "1", title: "Test Todo" }];

    todoRepo.getAll.mockResolvedValue(mockTodos);

    await todoController.getTodos(req, res);

    expect(todoRepo.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockTodos);
  });

  it("should update a todo successfully", async () => {
    const req = { params: { id: "1" }, body: { completed: true } };
    const mockUpdated = { _id: "1", title: "Test Todo", completed: true };

    todoRepo.update.mockResolvedValue(mockUpdated);

    await todoController.updateTodo(req, res);

    expect(todoRepo.update).toHaveBeenCalledWith("1", req.body);
    expect(res.json).toHaveBeenCalledWith(mockUpdated);
  });

  it("should delete a todo successfully", async () => {
    const req = { params: { id: "1" } };

    todoRepo.delete.mockResolvedValue(true);

    await todoController.deleteTodo(req, res);

    expect(todoRepo.delete).toHaveBeenCalledWith("1");
    expect(res.json).toHaveBeenCalledWith({ message: "Todo deleted" });
  });

  it("should return 404 when todo not found during delete", async () => {
    const req = { params: { id: "99" } };

    todoRepo.delete.mockResolvedValue(false);

    await todoController.deleteTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Todo not found" });
  });

  it("should handle repository errors gracefully", async () => {
    const req = { body: { title: "Error Todo" } };
    const error = new Error("Database failure");

    todoRepo.create.mockRejectedValue(error);

    await todoController.createTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error creating todo", error: "Database failure" });
  });
});

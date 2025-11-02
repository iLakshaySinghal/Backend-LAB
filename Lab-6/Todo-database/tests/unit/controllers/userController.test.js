const userController = require("../../../src/controllers/userController");
const User = require("../../../src/model/User");
const generateToken = require("../../../src/utils/generateToken");

// Mock dependencies
jest.mock("../../../src/model/User");
jest.mock("../../../src/utils/generateToken");

describe("User Controller - Unit Tests", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should register a new user successfully", async () => {
      const req = {
        body: {
          name: "Test",
          email: "test@example.com",
          password: "1234",
          role: "user",
        },
      };

      const mockUser = {
        _id: "1",
        name: "Test",
        email: "test@example.com",
        role: "user",
      };

      // Mock DB and token
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(mockUser);
      generateToken.mockReturnValue("mockToken");

      await userController.registerUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(User.create).toHaveBeenCalledWith(req.body);
      expect(generateToken).toHaveBeenCalledWith(mockUser._id, mockUser.role);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        _id: "1",
        name: "Test",
        email: "test@example.com",
        role: "user",
        token: "mockToken",
      });
    });

    it("should return 400 if user already exists", async () => {
      const req = { body: { email: "test@example.com" } };
      User.findOne.mockResolvedValue({ _id: "1" });

      await userController.registerUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
    });
  });

  describe("loginUser", () => {
    it("should login a user successfully", async () => {
      const req = {
        body: { email: "test@example.com", password: "1234" },
      };

      const mockUser = {
        _id: "1",
        name: "Test",
        email: "test@example.com",
        role: "user",
        matchPassword: jest.fn().mockResolvedValue(true),
      };

      User.findOne.mockResolvedValue(mockUser);
      generateToken.mockReturnValue("mockToken");

      await userController.loginUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(mockUser.matchPassword).toHaveBeenCalledWith("1234");
      expect(generateToken).toHaveBeenCalledWith("1", "user");
      expect(res.json).toHaveBeenCalledWith({
        _id: "1",
        name: "Test",
        email: "test@example.com",
        role: "user",
        token: "mockToken",
      });
    });

    it("should return 401 if password is invalid", async () => {
      const req = {
        body: { email: "test@example.com", password: "wrong" },
      };

      const mockUser = {
        matchPassword: jest.fn().mockResolvedValue(false),
      };

      User.findOne.mockResolvedValue(mockUser);

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid email or password" });
    });

    it("should return 401 if user not found", async () => {
      const req = {
        body: { email: "notfound@example.com", password: "1234" },
      };

      User.findOne.mockResolvedValue(null);

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid email or password" });

    });
  });
});

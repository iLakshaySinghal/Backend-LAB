process.env.JWT_SECRET = "testsecret123"; // add this
process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const User = require("../src/model/User");
const jwt = require("jsonwebtoken");

// Connect to test database before all tests
beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo_test_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Test MongoDB connected");

  // Create admin user for integration tests
  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
  });

  global.adminToken = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  console.log("✅ Admin token:", global.adminToken);
});

// Clean up database after each test
afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.close();
  console.log("❌ Test MongoDB disconnected");
});

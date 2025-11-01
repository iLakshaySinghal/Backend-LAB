const express = require("express");
const connectDB = require("./src/config/db");
const todoRoutes = require("./src/routes/todoRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

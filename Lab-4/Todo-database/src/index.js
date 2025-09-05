const express = require("express");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

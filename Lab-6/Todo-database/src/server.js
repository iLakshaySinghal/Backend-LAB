const express = require("express");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

// Only connect if not in test environment
if (process.env.NODE_ENV !== "test") {
  connectDB().then(() =>
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  );
}

module.exports = app;

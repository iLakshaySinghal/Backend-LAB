const express = require("express");
const readline = require("readline");

const connectDB = require("./config/db");
const TodoRepository = require("./repository/todoRepository");

const app = express();
app.use(express.json());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function menu() {
  console.log("\n===== 📋 TODO MENU =====");
  console.log("1. Create a todo");
  console.log("2. List all todos");
  console.log("3. Find todo by ID");
  console.log("4. Update todo by ID");
  console.log("5. Delete todo by ID");
  console.log("6. Exit");
  rl.question("👉 Choose an option (1-6): ", async (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter title: ", async (title) => {
          const todo = await TodoRepository.create({ title, completed: false });
          console.log("✅ Created:", todo);
          menu();
        });
        break;

      case "2":
        const all = await TodoRepository.getAll();
        console.log("📋 All Todos:", all);
        menu();
        break;

      case "3":
        rl.question("Enter todo ID: ", async (id) => {
          const todo = await TodoRepository.getById(id);
          console.log(todo ? "🔍 Found:" : "❌ Not found", todo);
          menu();
        });
        break;

      case "4":
        rl.question("Enter todo ID: ", async (id) => {
          rl.question("Mark as completed? (yes/no): ", async (answer) => {
            const updated = await TodoRepository.update(id, {
              completed: answer.toLowerCase() === "yes",
            });
            console.log(updated ? "✏️ Updated:" : "❌ Not found", updated);
            menu();
          });
        });
        break;

      case "5":
        rl.question("Enter todo ID: ", async (id) => {
          const deleted = await TodoRepository.delete(id);
          console.log(deleted ? "❌ Deleted:" : "❌ Not found", deleted);
          menu();
        });
        break;

      case "6":
        console.log("👋 Exiting...");
        rl.close();
        process.exit(0);
        break;

      default:
        console.log("⚠️ Invalid choice, try again.");
        menu();
    }
  });
}

app.listen(3000, async () => {
  console.log("🚀 Server is running on port 3000");

  // Connect DB
  await connectDB();
  console.log("✅ MongoDB is connected");

  // Start interactive menu
  menu();
});

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true, // ✅ Indexing for faster title search
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Virtual field: shows status text
TodoSchema.virtual("statusText").get(function () {
  return this.completed ? "Task completed ✅" : "Task pending ⏳";
});

// ✅ Pre-save trigger (Mongoose middleware)
TodoSchema.pre("save", function (next) {
  console.log(`🟢 Trigger: A new todo "${this.title}" is being saved.`);
  next();
});

// ✅ Ensure virtuals show up in JSON
TodoSchema.set("toJSON", { virtuals: true });
TodoSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Todo", TodoSchema);

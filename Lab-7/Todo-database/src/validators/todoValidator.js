const Joi = require("joi");

// Validation schema for Todo creation and update
const todoSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 3 characters long",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow("", null).max(255),
  completed: Joi.boolean(),
  statusText: Joi.string().allow("", null)
});

module.exports = {
  validateTodo(req, res, next) {
    const { error } = todoSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation Error",
        details: error.details.map(d => d.message)
      });
    }
    next();
  }
};

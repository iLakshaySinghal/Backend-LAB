const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getAllUsers } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, admin, getAllUsers);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/error.middleware");

// POST /auth/signup
router.post("/signup", authController.signup);

// POST /auth/signin
router.post("/signin", authController.signin);

// GET /auth/profile
router.get("/profile", authenticateToken, authController.getProfile);

module.exports = router;

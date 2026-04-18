const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { authenticateToken } = require("../middlewares/error.middleware");

// GET /tasks?completed=true
router.get("/", authenticateToken, taskController.getAll);

// GET /tasks/stats  (antes de /:id para não colidir)
router.get("/stats", authenticateToken, taskController.getStats);

// GET /tasks/:id
router.get("/:id", authenticateToken, taskController.getById);

// POST /tasks
router.post("/", authenticateToken, taskController.create);

// PUT /tasks/:id
router.put("/:id", authenticateToken, taskController.update);

// PATCH /tasks/:id/toggle
router.patch("/:id/toggle", authenticateToken, taskController.toggle);

// DELETE /tasks/:id
router.delete("/:id", authenticateToken, taskController.remove);

module.exports = router;

import express from "express";
import TasksController from "../controllers/TasksController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();
router.use(AuthMiddleware.authMiddleware);

router.get("/", TasksController.getTasks);
router.post("/", TasksController.createTask);
router.put("/:id", TasksController.updateTask);
router.delete("/:id", TasksController.deleteTask);

export default router;
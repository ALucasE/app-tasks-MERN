import { Router } from "express";
import { getAllTasks, createTask, deleteTask, editTask, getTaskById } from "../controllers/tasks.controllers.js";

import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/tasks", [authRequired], getAllTasks);
router.get("/tasks/:id", [authRequired], getTaskById);
router.post("/tasks", [authRequired], createTask);
router.put("/tasks/:id", [authRequired], editTask);
router.delete("/tasks/:id", [authRequired], deleteTask);

export default router;

import { Router } from "express";
import { getAllTasks, createTask, deleteTask, editTask, getTaskById } from "../controllers/tasks.controllers.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", [authRequired], getAllTasks);
router.get("/tasks/:id", [authRequired], getTaskById);
router.post("/tasks", [authRequired, validateSchema(createTaskSchema)], createTask);
router.put("/tasks/:id", [authRequired], editTask);
router.delete("/tasks/:id", [authRequired], deleteTask);

export default router;

import { Router } from "express";
import { tasks, upsertTask } from "../controllers/volunteerController.js";

const router = Router();

router.get("/tasks", tasks);
router.post("/tasks", upsertTask);

export default router;
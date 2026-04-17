import { Router } from "express";
import { feedback } from "../controllers/feedbackController.js";

const router = Router();

router.post("/", feedback);

export default router;
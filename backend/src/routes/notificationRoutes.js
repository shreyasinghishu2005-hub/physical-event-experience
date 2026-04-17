import { Router } from "express";
import { register, reminder } from "../controllers/notificationController.js";

const router = Router();

router.post("/register", register);
router.post("/reminder", reminder);

export default router;
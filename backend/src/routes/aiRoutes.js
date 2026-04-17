import { Router } from "express";
import {
  announcements,
  chat,
  recommendations,
  sentiment
} from "../controllers/aiController.js";

const router = Router();

router.post("/chat", chat);
router.post("/recommendations", recommendations);
router.post("/sentiment", sentiment);
router.post("/announcements", announcements);

export default router;
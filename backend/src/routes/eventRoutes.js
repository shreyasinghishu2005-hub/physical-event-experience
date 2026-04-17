import { Router } from "express";
import {
  bookmarks,
  checkIn,
  dashboard,
  navigation,
  sessions
} from "../controllers/eventController.js";

const router = Router();

router.get("/dashboard/:userId", dashboard);
router.get("/sessions", sessions);
router.post("/bookmarks", bookmarks);
router.post("/check-in", checkIn);
router.get("/navigation", navigation);

export default router;
import { Router } from "express";
import { connect, matches } from "../controllers/networkingController.js";

const router = Router();

router.get("/matches/:userId", matches);
router.post("/connect", connect);

export default router;
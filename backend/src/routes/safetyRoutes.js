import { Router } from "express";
import { helpDesks, sos } from "../controllers/safetyController.js";

const router = Router();

router.get("/help-desks", helpDesks);
router.post("/sos", sos);

export default router;
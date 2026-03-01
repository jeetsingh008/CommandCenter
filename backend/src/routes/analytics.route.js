import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getWeeklyStats, getCategoryStats } from "../controllers/analytics.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/weekly", getWeeklyStats);
router.get("/categories", getCategoryStats);

export default router;

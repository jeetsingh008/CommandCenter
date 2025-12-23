import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getWeeklyAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/weekly", getWeeklyAnalytics);

export default router;

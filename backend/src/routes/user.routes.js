import express from "express";
import { getMe } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Secured routes
router.route("/me").get(verifyJWT, getMe);

export default router;

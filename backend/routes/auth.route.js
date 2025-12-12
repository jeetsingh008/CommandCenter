import express from "express";
const router = express.Router();
import { syncGitHubUser } from "../controllers/auth.controller.js";

router.post("/github/sync", syncGitHubUser);

export default router;

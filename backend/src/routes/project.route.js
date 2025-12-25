import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createProject,
  getProjectById,
} from "../controllers/project.controller.js";

const router = Router();

router.use(verifyJWT);
router.route("/").post(createProject);
router.route("/:projectId").get(getProjectById);

export default router;

import express from "express";
import {
  syncGitHubUser,
  registerUser,
  loginUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
} from "../controllers/auth.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ===============
// Public Routes(No token verification needed)
// ===============

router.post("/github/sync", syncGitHubUser);

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.post("/login", loginUser);

// ===============
// Private Routes(Token verification needed)
// ===============

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

export default router;

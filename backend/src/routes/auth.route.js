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

// Sync GitHub user data with the database
router.post("/github/sync", syncGitHubUser);

// Register a new user
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

// Login user
router.post("/login", loginUser);

// ===============
// Private Routes(Token verification needed)
// ===============

// 4. Get Current User Profile
router.route("/current-user").get(verifyJWT, getCurrentUser);

// 5. Change Password
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

// 6. Update Account Details (Name, Email)
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

// 7. Update Avatar Image
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

export default router;

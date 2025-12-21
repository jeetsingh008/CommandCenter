import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"; // ✅ Imported
import { ApiResponse } from "../utils/ApiResponse.js"; // ✅ Imported
import { User } from "../models/user.model.js";
import { Project } from "../models/project.model.js";

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const projects = await Project.find({ owner: user._id });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, projects },
        "User profile and projects fetched successfully"
      )
    );
});


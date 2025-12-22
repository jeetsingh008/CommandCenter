import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";

const createProject = asyncHandler(async (req, res) => {
  const { title, description, color, status } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  // Create the project
  const project = await Project.create({
    title,
    description,
    color: color || "#3B82F6",
    status: status || "active",
    owner: req.user._id,
    // ⚠️ HARDCODED FOR NOW (To avoid file upload complexity in this step)
    previewImage: "https://placehold.co/600x400/1e1e1e/FFF?text=Project",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

export { createProject };

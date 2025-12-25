import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";
import { Log } from "../models/log.model.js";

const createProject = asyncHandler(async (req, res) => {
  const { title, description, color, status } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const project = await Project.create({
    title,
    description,
    color: color || "#3B82F6",
    status: status || "active",
    owner: req.user._id,
    // Hardcoded for now
    previewImage: "https://placehold.co/600x400/1e1e1e/FFF?text=Project",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findOne({
    _id: projectId,
    owner: req.user._id,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const stats = await Log.aggregate([
    {
      $match: {
        project: project._id,
        owner: req.user._id
      }
    },
    {
      $group: {
        _id: null,
        totalMinutes: { $sum: "$durationMinutes" },
        count: { $sum: 1 }
      }
    }
  ]);

  const totalMinutes = stats.length > 0 ? stats[0].totalMinutes : 0;
  const sessionCount = stats.length > 0 ? stats[0].count : 0;

  return res
    .status(200)
    .json(new ApiResponse(200, { 
      ...project.toObject(), 
      stats: { totalMinutes, sessionCount } 
    }, "Project details fetched"));
});

export { createProject, getProjectById }; 


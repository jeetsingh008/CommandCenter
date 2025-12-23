import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Log } from "../models/log.model.js";
import { Project } from "../models/project.model.js";

const createLog = asyncHandler(async (req, res) => {
  const { title, description, date, durationMinutes, category, projectId } = req.body;

  if (!title || !category) {
    throw new ApiError(400, "Title and Category are required");
  }

  if (projectId) {
    const project = await Project.findOne({ _id: projectId, owner: req.user._id });
    if (!project) {
      throw new ApiError(404, "Project not found or you don't have access");
    }
  }

  const log = await Log.create({
    title,
    description,
    date: date || new Date(),
    durationMinutes: parseInt(durationMinutes) || 0,
    category,
    project: projectId || null, 
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, log, "Work logged successfully"));
});

const getLogs = asyncHandler(async (req, res) => {

  const { page = 1, limit = 10, projectId } = req.query;
  
  const filter = { owner: req.user._id };
  
  if (projectId) {
    filter.project = projectId;
  }

  const logs = await Log.find(filter)
    .populate("project", "title color")
    .sort({ date: -1 }) 
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  return res
    .status(200)
    .json(new ApiResponse(200, logs, "Logs fetched successfully"));
});

export { createLog, getLogs };
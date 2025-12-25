import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Log } from "../models/log.model.js";
import mongoose from "mongoose";

const getWeeklyStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const stats = await Log.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
        date: { $gte: sevenDaysAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        totalMinutes: { $sum: "$durationMinutes" },
        sessions: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const totalStats = await Log.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalMinutes: { $sum: "$durationMinutes" } } },
  ]);

  const lifetimeMinutes =
    totalStats.length > 0 ? totalStats[0].totalMinutes : 0;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        weekly: stats,
        totalHours: (lifetimeMinutes / 60).toFixed(1),
      },
      "Analytics fetched"
    )
  );
});

export { getWeeklyStats };

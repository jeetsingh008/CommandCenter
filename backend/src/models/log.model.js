import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Log title is required"],
      trim: true 
    },
    description: { 
      type: String, 
      trim: true 
    },
    date: { 
      type: Date, 
      default: Date.now,
      index: true
    },
    durationMinutes: { 
      type: Number, 
      default: 0,
      min: [0, "Duration cannot be negative"] 
    },
    category: {
      type: String,
      enum: ["Coding", "Design", "Learning", "Meeting", "Planning", "Bug Fix", "Other"],
      required: true,
      default: "Coding"
    },
    project: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project",
      index: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
  },
  { timestamps: true }
);

export const Log = mongoose.model("Log", logSchema);
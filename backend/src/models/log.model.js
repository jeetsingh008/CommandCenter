import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    date: { type: Date, default: Date.now },
    durationMinutes: { type: Number, default: 0 },

    category: {
      type: String,
      enum: ["Design", "Learning", "Meeting", "Planning", "Other"],
      required: true,
    },

    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Log = mongoose.model("Log", logSchema);

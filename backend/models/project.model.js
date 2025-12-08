const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: 50,
    },

    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },

    previewImage: {
      type: String,
      required: [true, "Preview image is required"],
    },

    githubRepo: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "completed", "archived", "on-hold"],
      default: "active",
    },

    color: {
      type: String,
      default: "#3B82F6",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ owner: 1, title: 1 }, { unique: true });

export const Project = mongoose.model("Project", projectSchema);

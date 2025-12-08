import mongoose from "mongoose";

const gitHubEventSchema = new mongoose.Schema({
  githubId: { type: String, unique: true, required: true },

  eventType: { type: String, required: true },

  repoName: { type: String, required: true },
  message: String,
  url: String,

  createdAt: { type: Date, required: true },

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

export const GitHubEvent = mongoose.model("GitHubEvent", gitHubEventSchema);
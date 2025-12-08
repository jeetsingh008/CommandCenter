import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: function () {
        return !this.githubId;
      },
      minlength: 6,
      select: false,
    },

    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    githubUsername: {
      type: String,
    },
    githubAccessToken: {
      type: String,
      select: false,
    },
    lastSync: {
      type: Date,
      default: null,
    },

    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
    bio: {
      type: String,
      maxlength: 200,
    },
    jobTitle: {
      type: String,
      default: "Developer",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);

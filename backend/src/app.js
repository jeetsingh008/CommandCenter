import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://command-center-lilac.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", env: process.env.NODE_ENV });
});


// Auth Route registration
import authRouter from "./routes/auth.route.js";
app.use("/api/auth", authRouter);

// User Route registration
import userRouter from "./routes/user.routes.js";
app.use("/api/users", userRouter);

// Project Route registration
import projectRouter from "./routes/project.route.js";
app.use("/api/projects", projectRouter);

// Log Route registration
import logRouter from "./routes/log.route.js";
app.use("/api/logs", logRouter);

// Analytics Route registration
import analyticsRouter from "./routes/analytics.route.js";
app.use("/api/analytics", analyticsRouter);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  // Check if the error is our custom ApiError
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      error: err.error,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
  }

  // Fallback for unhandled/native errors
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

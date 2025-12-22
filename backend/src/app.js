import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Auth Route registration
import authRouter from "./routes/auth.route.js";
app.use("/api/auth", authRouter);

// User Route registration
import userRouter from "./routes/user.routes.js";
app.use("/api/users", userRouter);

// Project Route registration
import projectRouter from "./routes/project.route.js";
app.use("/api/projects", projectRouter);

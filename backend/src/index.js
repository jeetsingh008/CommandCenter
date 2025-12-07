import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import dotenv from "dotenv";
import { connectDB } from "../db/index.js";
dotenv.config();

connectDB();

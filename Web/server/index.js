
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRouter from "./Routes/userRoutes.js";
import authRouter from "./Routes/auth.js";
import meetingRouter from "./Routes/meetings.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import cookieSession from "cookie-session";
// import passportSetup from './google_auth/passport.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3001"], // Add origins for both client apps
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/auth", UserRouter);
app.use("/auth/user", authRouter);
app.use("/meetings", meetingRouter); // Use the meeting routes

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/authentication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Google Authentication Middleware
app.use(
  cookieSession({
    name: "Session",
    maxAge: 24 * 60 * 60 * 1000, // Corrected maxAge value
    keys: ["cyberwolve"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

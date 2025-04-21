import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./passportConfig.js"; // Import Passport Config
import authRoutes from "./routes/auth.js"; // Ensure the file extension is correct
import postRoutes from "./routes/postRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import { setupSocket } from "./sockets/gameSocket.js";
import http from "http";
dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST"],
  })
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use(cookieParser());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Serve uploaded games statically
app.use("/uploads", express.static("uploads"));

// Upload route
app.use("/api/upload", uploadRoutes);
app.use("/api/games", gameRoutes);
// Connect to MongoDB

setupSocket(server);


mongoose
  .connect(process.env.MONGO_URI) // Removed the "!" here
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

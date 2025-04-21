import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import { launchGame } from "../controllers/gameLauncher.js";
import { startStreaming } from "../controllers/streamServer.js";
import path from "path";
import fs from "fs";

const router = express.Router();

router.post("/start/:folderId", async (req, res) => {
  const folderId = req.params.folderId;

  // If folderId matches the hardcoded one, launch directly
  if (folderId === "85bc49d5-ac39-4960-a9e4-2d0298d7bd60") {
    const exePath = path.resolve(
      "C:/Users/Acer/Downloads/project-bolt-sb1-gknff3jr/server/uploads/85bc49d5-ac39-4960-a9e4-2d0298d7bd60/dist/catch_game.exe"
    );
    console.log("Launching specific game path:", exePath);
    launchGame(exePath);
    setTimeout(() => {
      startStreaming();
    }, 3000);

    return res.json({ message: "Game started and streaming initiated." });
  }

  // Otherwise, dynamically find the .exe in the given folder
  try {
    const gamePath = path.join("uploads", folderId);
    const files = await fs.promises.readdir(gamePath);
    const exe = files.find((f) => f.endsWith(".exe"));

    if (!exe) return res.status(404).send("Game EXE not found");

    const exePath = path.join(gamePath, exe);
    console.log("Starting game:", exePath);
    launchGame(exePath);
    startStreaming();

    res.json({ message: "Game started and streaming initiated." });
  } catch (err) {
    console.error("Error launching game:", err);
    res.status(500).send("Server error while launching the game");
  }
});

export default router;

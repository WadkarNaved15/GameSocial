import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import unzipper from "unzipper";
import { v4 as uuidv4 } from "uuid";
import Post from "../models/Post.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

const tempDir = path.resolve("temp");
const uploadsDir = path.resolve("uploads");

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer setup
const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post("/", verifyToken, upload.single("gamezip"), async (req, res) => {
  const file = req.file;
  const userId = req.user.id;
  const { description } = req.body;

  if (!file) return res.status(400).send("No file uploaded");
  if (!description) return res.status(400).send("Description is required");

  const uniqueFolder = uuidv4();
  const extractPath = path.join(uploadsDir, uniqueFolder);
  fs.mkdirSync(extractPath);

  fs.createReadStream(file.path)
    .pipe(unzipper.Extract({ path: extractPath }))
    .on("close", async () => {
      fs.unlinkSync(file.path); // delete temp zip

      try {
        const extractedItems = fs.readdirSync(extractPath);
        const subfolder = extractedItems.find(name => {
          const fullPath = path.join(extractPath, name);
          return fs.statSync(fullPath).isDirectory();
        });

        if (!subfolder) {
          return res.status(500).send("No folder found inside ZIP");
        }

        const gameUrl = `${req.protocol}://${req.get("host")}/uploads/${uniqueFolder}/${subfolder}/index.html`;

        const newPost = new Post({
          user: userId,
          description,
          type: "game_post",
          gameUrl,
          media: [], // Optional: keep empty for game_post
        });

        await newPost.save();

        res.status(201).json({
          message: "Game uploaded successfully",
          post: newPost,
        });

      } catch (err) {
        console.error("Folder detection error:", err);
        res.status(500).send("Error while preparing game URL");
      }
    })
    .on("error", (err) => {
      console.error("Unzip error:", err);
      res.status(500).send("Failed to extract ZIP file");
    });
});

export default router;

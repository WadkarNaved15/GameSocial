import { spawn } from "child_process";

let currentSocket = null;

export const setSocket = (socket) => {
  currentSocket = socket;
};

export const startStreaming = () => {
  const ffmpeg = spawn("ffmpeg", [
    "-f", "gdigrab",
    "-framerate", "30",
    "-i", "title=Catch the Ball",
    "-vcodec", "libx264",
    "-preset", "ultrafast",
    "-tune", "zerolatency",
    "-f", "mp4",      // ✅ send fmp4
    "-movflags", "frag_keyframe+empty_moov+default_base_moof", // ✅ critical for streaming
    "pipe:1",
  ]);
  

  ffmpeg.stdout.on("data", (chunk) => {
    if (currentSocket) {
      currentSocket.emit("video", chunk);
    }
  });

  ffmpeg.stderr.on("data", (data) => {
    console.log(`FFmpeg stderr: ${data}`);
  });

  ffmpeg.on("exit", () => {
    console.log("FFmpeg exited");
  });

  return ffmpeg;
};

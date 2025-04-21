import { spawn } from "child_process";
import { MediaStream, nonstandard } from "wrtc";

export const startFFmpeg = () => {
  const videoStream = new nonstandard.MediaStream();

  const ffmpeg = spawn("ffmpeg", [
    "-f", "gdigrab",
    "-framerate", "30",
    "-i", "title=Catch the Ball",
    "-vcodec", "libx264",
    "-preset", "ultrafast",
    "-tune", "zerolatency",
    "-f", "rawvideo",
    "-pix_fmt", "yuv420p",
    "pipe:1",
  ]);

  const videoTrack = new nonstandard.RTCVideoSource().createTrack();
  videoStream.addTrack(videoTrack);

  // You'll need to decode frames and feed them to the track
  // This requires frame parsing, or using `ffmpeg.wasm` or `node-webm`

  return videoStream;
};

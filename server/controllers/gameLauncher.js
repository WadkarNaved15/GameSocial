import { spawn } from "child_process";
import path from "path";

export const launchGame = (exePath) => {
  const gameProcess = spawn(exePath, {
    detached: true,
    stdio: "ignore",
    cwd: path.dirname(exePath),
  });

  gameProcess.unref();
  console.log("Game launched:", exePath);
};

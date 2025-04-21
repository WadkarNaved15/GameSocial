import { keyboard, Key, mouse, Point } from "@nut-tree-fork/nut-js";

// OPTIONAL: Configure if needed
// keyboard.config.autoDelayMs = 50;
// mouse.config.mouseSpeed = 100;

const keyMap = {
  a: Key.A, b: Key.B, c: Key.C, d: Key.D,
  e: Key.E, f: Key.F, g: Key.G, h: Key.H,
  i: Key.I, j: Key.J, k: Key.K, l: Key.L,
  m: Key.M, n: Key.N, o: Key.O, p: Key.P,
  q: Key.Q, r: Key.R, s: Key.S, t: Key.T,
  u: Key.U, v: Key.V, w: Key.W, x: Key.X,
  y: Key.Y, z: Key.Z,
  " ": Key.Space,
  Enter: Key.Enter,
  ArrowUp: Key.Up,
  ArrowDown: Key.Down,
  ArrowLeft: Key.Left,
  ArrowRight: Key.Right,
  Escape: Key.Escape
  // Add more if needed
};

export const handleInput = (socket) => {
  socket.on("key", async (key) => {
    const mappedKey = keyMap[key];
    if (mappedKey) {
      await keyboard.pressKey(mappedKey);
      await keyboard.releaseKey(mappedKey);
    } else {
      console.log("Key not mapped:", key);
    }
  });

  socket.on("mouse", async ({ x, y }) => {
    await mouse.setPosition(new Point(x, y));
  });
};

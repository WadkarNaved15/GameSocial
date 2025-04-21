import { setSocket } from "../controllers/streamServer.js";
import { Server } from "socket.io";
export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    setSocket(socket); // Connect streaming to this socket

    socket.on("key", (key) => {
      console.log("Key pressed:", key);
      // TODO: Implement control mapping to the actual game
    });

    socket.on("mouse", (position) => {
      console.log("Mouse moved:", position);
      // TODO: Send mouse input to game
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

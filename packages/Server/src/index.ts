import dotenv from "dotenv";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import EventListener from "./EventListener";

dotenv.config();
const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

const registerListeners = (socket: Socket) => {
  EventListener(io, socket);
};

io.on("connection", registerListeners);

httpServer.listen(process.env.PORT, () => {
  console.log(`server listening on PORT: ${process.env.PORT}`);
});

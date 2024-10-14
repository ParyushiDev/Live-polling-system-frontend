import { io } from "socket.io-client";

export default io("https://live-polling-system-backend.onrender.com/", {
  autoConnect: false,
});

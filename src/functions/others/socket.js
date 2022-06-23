import { SERVER_BASE_URL } from "configs/configs";
import { io } from "socket.io-client";

const socket = io(SERVER_BASE_URL);

export { socket };

import { io } from "socket.io-client";

import { SERVER_BASE_URL } from "configs/configs";

const socket = io(SERVER_BASE_URL);

export { socket };

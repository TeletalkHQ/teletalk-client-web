import { io } from "socket.io-client";

import { SERVER_BASE_URL } from "variables/others/otherConstants";

const socket = io(SERVER_BASE_URL);

export { socket };

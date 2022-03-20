import { io } from "socket.io-client";

import { BASE_URL } from "~/Variables/Constants/Others/otherConstants";

const socket = io(BASE_URL);

export { socket };

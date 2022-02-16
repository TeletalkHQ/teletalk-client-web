import { io } from "socket.io-client";

import { baseURL } from "~/Variables/Constants/Others/otherConstants";

const socket = io(baseURL);

export { socket };

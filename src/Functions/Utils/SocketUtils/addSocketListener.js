import { socket } from "~/Functions/Others/socket";

const addSocketListener = (cb) => {
	cb(socket);
};

export { addSocketListener };

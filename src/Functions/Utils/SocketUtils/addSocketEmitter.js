import { socket } from "~/Functions/Others/socket";

const addSocketEmitter = (cb) => {
	cb(socket);
};

export { addSocketEmitter };

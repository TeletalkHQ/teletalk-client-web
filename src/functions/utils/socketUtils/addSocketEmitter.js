import { socket } from "~/functions/others/socket";

const addSocketEmitter = (cb) => {
  cb(socket);
};

export { addSocketEmitter };

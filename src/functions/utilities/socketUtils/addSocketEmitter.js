import { socket } from "functions/otherFunctions/socket";

const addSocketEmitter = (cb) => {
  cb(socket);
};

export { addSocketEmitter };

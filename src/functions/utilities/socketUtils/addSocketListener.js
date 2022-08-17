import { socket } from "functions/otherFunctions/socket";

const addSocketListener = (cb) => {
  cb(socket);
};

export { addSocketListener };

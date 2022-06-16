import { socket } from "functions/others/socket";

const addSocketListener = (cb) => {
  cb(socket);
};

export { addSocketListener };

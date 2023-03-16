import io from "socket.io-client";
import { appConfigs } from "src/classes/AppConfigs";

const serverUrl = appConfigs.getConfigs().apiConfigs.SERVER_BASE_URL;

class Websocket {
  constructor() {
    this.client = this.initializeClient();
  }

  initializeClient(options = {}) {
    return io(serverUrl, {
      autoConnect: false,
      withCredentials: true,
      ...options,
    });
  }
}

const websocket = new Websocket();

export { websocket, Websocket };

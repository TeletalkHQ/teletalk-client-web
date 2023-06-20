import io, { Socket } from "socket.io-client";

import { appConfigs } from "~/classes/AppConfigs";

class Websocket {
  client: Socket;

  constructor() {
    this.client = this.initializeClient();
  }

  initializeClient(options = {}) {
    return io(appConfigs.getConfigs().api.serverBaseUrl, {
      autoConnect: false,
      withCredentials: true,
      ...options,
    });
  }
}

const websocket = new Websocket();

export { websocket, Websocket };

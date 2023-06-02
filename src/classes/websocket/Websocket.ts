import io, { Socket } from "socket.io-client";

import { appConfigs } from "~/classes/AppConfigs";

class Websocket {
  client: Socket;

  constructor() {
    this.client = this.initializeClient();
  }

  initializeClient(options = {}) {
    const serverUrl = appConfigs.getConfigs().apiConfigs.SERVER_BASE_URL;

    console.log("serverUrl:::", serverUrl);

    return io(serverUrl, {
      autoConnect: false,
      withCredentials: true,
      ...options,
    });
  }
}

const websocket = new Websocket();

export { websocket, Websocket };

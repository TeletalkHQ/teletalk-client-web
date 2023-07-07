import io, { Socket } from "socket.io-client";

import { appConfigs } from "~/classes/AppConfigs";

interface Options {
  url: string;
}

class Websocket {
  client: Socket;
  private defaultOptions: Options = {
    url: appConfigs.getConfigs().api.selectedServerUrl,
  };

  initialize(options = this.defaultOptions) {
    return io(options.url, {
      autoConnect: false,
      withCredentials: true,
    });
  }

  setClient(client: Socket) {
    this.client = client;
  }
}

const websocket = new Websocket();

export { websocket, Websocket };

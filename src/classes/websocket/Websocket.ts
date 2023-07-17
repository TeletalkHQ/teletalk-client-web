import io, { Socket } from "socket.io-client";

import { appConfigs } from "~/classes/AppConfigs";

interface Options {
  url: string;
}

export class Websocket {
  client: Socket;

  initialize(options = this.getDefaultOptions()) {
    return io(options.url, {
      autoConnect: false,
      withCredentials: true,
    });
  }
  getDefaultOptions() {
    return {
      url: appConfigs.getConfigs().api.selectedServerUrl,
    } as Options;
  }

  setClient(client: Socket) {
    this.client = client;
  }
}

export const websocket = new Websocket();

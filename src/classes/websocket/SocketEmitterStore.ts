import { stuffStore } from "~/classes/StuffStore";
import { EventHandler, eventHandler } from "~/classes/websocket/EventHandler";
import { EventName, SocketRoute } from "~/types";

type Events = {
  [key in EventName]: EventHandler;
};

class SocketEmitterStore {
  //@ts-ignore
  events: Events = {};

  build() {
    stuffStore.events.forEach((i) => {
      this.events[i.name] = eventHandler.create().setRoute(i as SocketRoute);
    });
  }
}

const socketEmitterStore = new SocketEmitterStore();

export { socketEmitterStore, SocketEmitterStore };

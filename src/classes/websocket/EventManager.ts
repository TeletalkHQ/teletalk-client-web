import { EventHandler, eventHandler } from "~/classes/websocket/EventHandler";
import { stuffStore } from "~/classes/StuffStore";

import { EventName, SocketRoute } from "~/types";

type Events = {
  [key in EventName]: EventHandler;
};

class SocketEmitterStore {
  events: Events;

  build() {
    const events = stuffStore.events;
    Object.entries(events).forEach(([name, route]) => {
      this.events[name as EventName] = eventHandler
        .create()
        .setRoute(route as SocketRoute);
    });
  }
}

const socketEmitterStore = new SocketEmitterStore();

export { socketEmitterStore, SocketEmitterStore };

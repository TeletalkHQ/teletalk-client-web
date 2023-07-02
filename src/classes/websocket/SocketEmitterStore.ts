import { stuffStore } from "~/classes/StuffStore";
import { EventHandler, eventHandler } from "~/classes/websocket/EventHandler";
import { EventName, SocketRoute } from "~/types";

type Events = {
  [key in EventName]: EventHandler;
};

class SocketEmitterStore {
  //@ts-ignore
  events: Events = {};
}

const socketEmitterStore = new SocketEmitterStore();

const events = stuffStore.events;
events.forEach((i) => {
  socketEmitterStore.events[i.name as EventName] = eventHandler
    .create()
    .setRoute(i as SocketRoute);
});

export { socketEmitterStore, SocketEmitterStore };

import { stuffStore } from "~/classes/StuffStore";
import { EventHandler, eventHandler } from "~/classes/websocket/EventHandler";
import { EventName, SocketRoute } from "~/types";

type Events = {
  [key in EventName]: EventHandler;
};

export class SocketEmitterStore {
  events = stuffStore.events.reduce((prevValue, currValue) => {
    const c = currValue as SocketRoute;
    prevValue[c.name] = eventHandler().setRoute(c);
    return prevValue;
  }, {} as Events);
}

export const socketEmitterStore = new SocketEmitterStore();

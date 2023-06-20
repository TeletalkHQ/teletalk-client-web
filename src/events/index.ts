import { addOnlineStatusEvents } from "~/events/onlineConnectionsChecker";
import { websocketEvents } from "~/events/websocket";

const events = {
  addOnlineStatusEvents,
  websocket: websocketEvents,
};

export { events };

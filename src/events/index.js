import { addOnlineStatusEvents } from "src/events/onlineConnectionsChecker";

import { websocketEvents } from "src/events/websocket";

const events = {
  addOnlineStatusEvents,
  websocket: websocketEvents,
};

export { events };

import { websocket } from "~/classes/websocket/Websocket";
import { windowUtilities } from "~/classes/WindowUtilities";

const otherEvents = () => {
  websocket.client.onAny((event, ...args) => {
    logger.debug(`socket event:${event}`, ...args);
  });

  websocket.client.on("pong", (...args) => logger.debug(...args));
  windowUtilities.addProperty("ping", (...args) =>
    websocket.client.emit("ping", ...args)
  );
};

export { otherEvents };

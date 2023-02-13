import { websocket } from "src/classes/Websocket";
import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

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

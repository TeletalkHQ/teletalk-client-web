import { websocket } from "~/classes/websocket/Websocket";
import { EventName, IOCollection, SocketResponse } from "~/types";

export const useListener = <EvName extends EventName>({
  evName,
  cb,
}: {
  evName: EvName;
  //@ts-ignore
  cb: (response: SocketResponse<IOCollection[EvName]["output"]>) => void;
}) => {
  websocket.client.off(evName);
  websocket.client.on<EventName>(evName, cb);
};

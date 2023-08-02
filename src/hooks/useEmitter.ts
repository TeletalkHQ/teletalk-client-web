import { stuffStore } from "~/classes/StuffStore";
import { eventHandler } from "~/classes/websocket/EventHandler";
import { EventName, SocketRoute } from "~/types";

import { useLoading } from "./useLoading";

export const useEmitter = <EvName extends EventName>(evName: EvName) => {
  const { loading, updateLoading } = useLoading();

  //@ts-ignore
  type IOType = IOCollection[EvName];

  const handler = eventHandler<IOType>(updateLoading).setRoute(
    stuffStore.events.find((i) => i.name === evName) as SocketRoute
  );

  return {
    handler,
    loading,
  };
};

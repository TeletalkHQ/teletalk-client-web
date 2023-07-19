import { useState } from "react";

import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import { Status, Url } from "~/types";
import { utils } from "~/utils";

export const usePing = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const handlePingServer = async (url: Url) => {
    setLoading(true);
    setStatus("pending");
    utils.setWebsocketClient(url);
    websocket.client.on("connect", () => {
      websocket.client.disconnect();
      setStatus("online");
      setLoading(false);
    });
    websocket.client.on("connect_error", () => {
      setStatus("offline");
      websocket.client.disconnect();
      setLoading(false);
    });
    websocket.client.connect();
    await socketEmitterStore.events.ping.emitFull(
      {},
      undefined,
      () => {
        setStatus("offline");
        websocket.client.disconnect();
      },
      {
        timeout: 3000,
      }
    );
  };

  return {
    loading,
    status,
    pinger: handlePingServer,
    setStatus,
  };
};

import { useState } from "react";

import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import { PingIO, Status, Url } from "~/types";
import { utils } from "~/utils";

export const usePing = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const pinger = async (url: Url) => {
    setLoading(true);
    setStatus("pending");

    utils.setWebsocketClient(url);

    websocket.client.on("connect_error", () => {
      handleSettled("offline");
    });

    websocket.client.connect();

    await emitPingEvent();
  };

  const emitPingEvent = () => {
    return socketEmitterStore.events.ping.emitFull<PingIO>(
      {},
      successPingCallback,
      failPingCallback,
      {
        timeout: 1000,
      }
    );
  };

  const successPingCallback = async ({ data }: { data: PingIO["output"] }) => {
    handleSettled("online");
    return data;
  };

  const failPingCallback = () => {
    handleSettled("offline");
  };

  const handleSettled = (status: Status) => {
    setStatus(status);
    websocket.client.disconnect();
    setLoading(false);
  };

  return {
    loading,
    pinger,
    setStatus,
    status,
  };
};

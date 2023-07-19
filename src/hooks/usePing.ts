import { useState } from "react";

import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import { PingIO, ServerTestResult, Status, Url } from "~/types";
import { utils } from "~/utils";

export const usePing = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const pinger = async (url: Url) => {
    setLoading(true);
    setStatus("pending");
    await setClientId(url);

    return new Promise<ServerTestResult>((resolve) => {
      utils.setWebsocketClient(url);

      websocket.client.on("connect", async () => {
        await emitPingEvent();
        const endTime = Date.now();
        resolve({
          ping: endTime - startTime,
          status: "online",
          url,
        });
      });

      websocket.client.on("connect_error", () => {
        handleSettled("offline");
        resolve({
          ping: -1,
          status: "offline",
          url,
        });
      });

      const startTime = Date.now();
      websocket.client.connect();
    });
  };

  const setClientId = async (url: Url) => {
    try {
      await fetch(`${url}/setClientId`, {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      handleSettled("offline");
    }
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
    console.log("error happened!");

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
    setClientId,
    setStatus,
    status,
  };
};

import { useState } from "react";

import { websocket } from "~/classes/websocket/Websocket";
import { ServerTestResult, Status, Url } from "~/types";

import { useEmitter } from "./useEmitter";

export const usePing = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const { handler } = useEmitter("ping");

  const pinger = async (url: Url) => {
    setLoading(true);
    setStatus("pending");
    await setClientId(url);

    return new Promise<ServerTestResult>((resolve) => {
      setWebsocketClient(url);

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

  const setWebsocketClient = (url: Url) => {
    websocket.client?.removeAllListeners();
    websocket.client?.disconnect();

    const client = websocket.initialize({
      url,
    });
    websocket.setClient(client);
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
    return handler.emitFull({}, successPingCallback, failPingCallback, {
      timeout: 1000,
    });
  };

  const successPingCallback = () => {
    handleSettled("online");
  };

  const failPingCallback = () => {
    handleSettled("offline");
  };

  const handleSettled = (status: Status) => {
    setStatus(status);
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

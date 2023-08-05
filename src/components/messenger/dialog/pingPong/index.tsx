import { useState } from "react";

import { websocket } from "~/classes/websocket/Websocket";
import { useEmitter, useListener } from "~/hooks";

const PingPong = () => {
  const [isConnected, setIsConnected] = useState(websocket.client.connected);
  const [lastPong, setLastPong] = useState("");
  const { handler } = useEmitter("ping");

  useListener({
    evName: "connect",
    cb: () => {
      setIsConnected(true);
    },
  });

  useListener({
    evName: "disconnect",
    cb: () => {
      setIsConnected(false);
    },
  });

  useListener({
    evName: "pong",
    cb: () => {
      setLastPong(new Date().toISOString());
    },
  });

  const sendPing = () => {
    handler.emitFull({});
  };

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  );
};

export default PingPong;

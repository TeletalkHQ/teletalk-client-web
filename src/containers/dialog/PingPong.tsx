import { useEffect, useState } from "react";

import { websocket } from "~/classes/websocket/Websocket";

const PingPong = () => {
  const [isConnected, setIsConnected] = useState(websocket.client.connected);
  const [lastPong, setLastPong] = useState("");

  useEffect(() => {
    websocket.client.on("connect", () => {
      setIsConnected(true);
    });

    websocket.client.on("disconnect", () => {
      setIsConnected(false);
    });

    websocket.client.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      websocket.client.off("connect");
      websocket.client.off("disconnect");
      websocket.client.off("pong");
    };
  }, []);

  const sendPing = () => {
    websocket.client.emit("ping");
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

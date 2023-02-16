import { useEffect, useState } from "react";

import { websocket } from "src/classes/websocket/Websocket";

const PingPong = () => {
  const [isConnected, setIsConnected] = useState(websocket.client.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    websocket.client.connect();

    websocket.client.on("connect", () => {
      setIsConnected(true);
    });

    websocket.client.on("disconnect", () => {
      setIsConnected(false);
    });

    websocket.client.on("pong", () => {
      const date = new Date().toISOString();
      setLastPong(date);
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

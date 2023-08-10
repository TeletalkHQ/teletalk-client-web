import { useState } from "react";

import { websocket } from "~/classes/websocket/Websocket";
import { Input } from "~/components";
import Box from "~/components/general/box";
import { Typography } from "~/components/general/typography";
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
    <Box.Div>
      <Typography.GreyTextParagraph>
        Connected: {"" + isConnected}
      </Typography.GreyTextParagraph>
      <Typography.GreyTextParagraph>
        Last pong: {lastPong || "-"}
      </Typography.GreyTextParagraph>
      <Input.Button onClick={sendPing}>Send ping</Input.Button>
    </Box.Div>
  );
};

export default PingPong;

import { useEffect } from "react";

import { websocket } from "~/classes/websocket/Websocket";
import Box from "~/components/general/box";
import LeftSide from "~/containers/leftSide";
import RightSide from "~/containers/rightSide";
import { controllers } from "~/controllers";
import { stateStatics } from "~/store/stateStatics";

const Messenger = () => {
  useEffect(() => {
    const fn = async () => {
      websocket.client.connect();
      //TODO: Update in/out events with events from server
      websocket.client.emit("joinRoom");

      if (state.global.viewMode === stateStatics.VIEW_MODES.MESSENGER)
        dispatch(controllers.getPrivateChats());

      websocket.client.on("newPrivateChatMessage", (data) => {
        dispatch(controllers.newPrivateChatMessage(data));
      });
    };

    fn();

    return () => websocket.client.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box.Grid
      container
      style={{
        height: "100vh",
      }}
    >
      <LeftSide />
      <RightSide />
    </Box.Grid>
  );
};

export default Messenger;

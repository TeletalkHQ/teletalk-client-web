import { useEffect } from "react";

import { websocket } from "src/classes/websocket/Websocket";

import { Box } from "src/components/general/box";

import LeftSide from "src/containers/leftSide";
import RightSide from "src/containers/rightSide";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "react-redux";

import { stateStatics } from "src/store/stateStatics";

const Messenger = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

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
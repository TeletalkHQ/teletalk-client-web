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
      //TODO: Update in/out events with events from server
      socketEmitterStore.events.joinRoom.emit();

      dispatch(controllers.getPrivateChats());

      socketEmitterStore.events.getUserData.emitFull({}, async () => {
        //TODO: Update user data
        //TODO: Update users with contacts
        // const fixContacts = (contacts) =>
        //   contacts.map((item) => ({
        //     ...item,
        //     isContact: true,
        //   }));
      });

      websocket.client.on("newPrivateChatMessage", (data) => {
        dispatch(controllers.newPrivateChatMessage(data));
      });
    };

    fn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box.Grid
      container
      style={{
        height: "100vh",
      }}
    >
      {/* <LeftSide />
      <RightSide /> */}
    </Box.Grid>
  );
};

export default Messenger;

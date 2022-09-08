import { useEffect } from "react";

import GridContainer from "components/generals/boxes/GridContainer";

import LeftSideContainer from "components/containers/LeftSideContainer";
import RightSideContainer from "components/containers/RightSideContainer";

import { useMainContext } from "hooks/useMainContext";

import { getUserChatsLastMessageController } from "controllers/messageControllers/getUserChatsLastMessageController";

import { printCatchError } from "functions/utilities/otherUtilities";

const MessengerContainer = () => {
  const {
    state: {
      userState: { chats },
    },
    hooksOutput: { dispatchAsync },
  } = useMainContext();

  useEffect(
    () => updateUserChats,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateUserChats = async () => {
    try {
      await dispatchAsync(getUserChatsLastMessageController({ chats }));
    } catch (error) {
      printCatchError(updateUserChats.name, error);
    }
  };

  return (
    <GridContainer style={{ height: "100vh" }}>
      <LeftSideContainer />
      <RightSideContainer />
    </GridContainer>
  );
};

export default MessengerContainer;

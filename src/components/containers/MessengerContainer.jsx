import GridContainer from "components/generals/boxes/GridContainer";

import LeftSideContainer from "components/containers/LeftSideContainer";
import RightSideContainer from "components/containers/RightSideContainer";

const MessengerContainer = () => {
  return (
    <GridContainer style={{ height: "100vh" }}>
      <LeftSideContainer />
      <RightSideContainer />
    </GridContainer>
  );
};

export default MessengerContainer;

//  const chat = userState.chats.find((chat) => {
//    return chat.participants.find(
//      (participant) => participant.participantId === privateId
//    );
//  });

//  if (chat) {
//    const intervalId = setInterval(() => {
//      dispatch(getAllChatMessagesController({ chatId: chat.chatId }));
//    }, 1000);
//    return () => {
//      clearInterval(intervalId);
//    };
//  }

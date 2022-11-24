import GridContainer from "components/generals/boxes/GridContainer";

import LeftSideContainer from "containers/LeftSide";
import RightSideContainer from "containers/RightSide";

const Messenger = () => {
  return (
    <GridContainer style={{ height: "100vh" }}>
      <LeftSideContainer />
      <RightSideContainer />
    </GridContainer>
  );
};

export default Messenger;

//  const chat = user.chats.find((chat) => {
//    return chat.participants.find(
//      (participant) => participant.participantId === userId
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

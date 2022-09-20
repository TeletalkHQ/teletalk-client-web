import { tempActions } from "actions/tempActions";

import ChatBar from "components/rightSideComponents/ChatBar";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import MessageInput from "components/rightSideComponents/MessageInput";
import GridContainer from "components/generals/boxes/GridContainer";

import { sendPrivateMessageController } from "controllers/messageControllers/sendPrivateMessageController";

import { useMainContext } from "hooks/useMainContext";

const { selectedContactId, messageInputOnChangeAction } = tempActions;

const RightSideContainer = () => {
  const {
    state: {
      tempState: {
        selectedContact: { firstName, lastName },
        selectedContact,
        messageInputText,
      },
    },
    hooksOutput: { dispatch },
  } = useMainContext();

  const handleInputChange = ({ target: { value } }) => {
    dispatch(messageInputOnChangeAction({ messageInputText: value }));
  };

  const handleAddNewMessage = async () => {
    dispatch(sendPrivateMessageController());
  };

  const handleMessageContainerCloseClick = () => {
    dispatch(selectedContactId({ selectedContactId: "" }));
  };

  // const chat = arrayUtilities.findByPropValueEquality(
  //   userState.chats,
  //   privateId,
  //   "participantId"
  // );

  // if (!chat && !selectedContact) {
  //   return null;
  // }

  return (
    <GridContainer
      sx={{ backgroundColor: "tomato", height: "100%" }}
      item
      lg={9}
      md={8}
    >
      {selectedContact.privateId && (
        <CustomFlexBox
          col
          sx={{ width: "100%", height: "100%" }}
          jc="space-between"
          ai="center"
        >
          <CustomBox sx={{ height: "50px", width: "100%" }}>
            <ChatBar
              onMessageContainerCloseClick={handleMessageContainerCloseClick}
              chatName={`${firstName} ${lastName}`}
            />
          </CustomBox>

          <CustomBox sx={{ height: "100%", width: "100%" }}>
            {/* <MessageList
              messages={chat?.messages || []}
              userState={userState}
            /> */}
          </CustomBox>

          <CustomBox sx={{ width: "100%" }}>
            <MessageInput
              messageInputText={messageInputText}
              onAddNewMessage={handleAddNewMessage}
              onInputChange={handleInputChange}
            />
          </CustomBox>
        </CustomFlexBox>
      )}
    </GridContainer>
  );
};

export default RightSideContainer;

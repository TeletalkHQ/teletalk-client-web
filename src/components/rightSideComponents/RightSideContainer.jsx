import MessageInput from "components/rightSideComponents/MessageInput";
import MessageList from "components/rightSideComponents/MessageList";
import ChatBar from "components/rightSideComponents/ChatBar";

import { useMainContext } from "hooks/useMainContext";

import { tempActions } from "actions/tempActions";

import { sendPrivateMessageController } from "controllers/messageControllers/sendPrivateMessageController";
import { useEffect } from "react";
import { getAllChatMessagesController } from "controllers/messageControllers/getAllChatMessagesController";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomBox from "components/generals/boxes/CustomBox";
import { arrayUtilities } from "classes/ArrayUtilities";

const { selectedContactId, messageInputOnChangeAction } = tempActions;

const RightSideContainer = () => {
  const {
    state: {
      tempState: {
        selectedContact: { firstName, lastName, privateId },
        selectedContact,
        messageInputText,
      },
      userState,
    },
    hooksOutput: { dispatch },
  } = useMainContext();

  useEffect(() => {
    try {
      const chat = userState.chats.find((chat) => {
        return chat.participants.find(
          (participant) => participant.participantId === privateId
        );
      });

      if (chat) {
        const intervalId = setInterval(() => {
          dispatch(getAllChatMessagesController({ chatId: chat.chatId }));
        }, 1000);

        return () => {
          clearInterval(intervalId);
        };
      }
    } catch (error) {
      console.log("RightSideContainer useEffect for chat updater", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = ({ target: { value } }) => {
    dispatch(messageInputOnChangeAction({ messageInputText: value }));
  };

  const handleAddNewMessage = async () => {
    dispatch(sendPrivateMessageController());
  };

  const handleMessageContainerCloseClick = () => {
    dispatch(selectedContactId({ selectedContactId: "" }));
  };

  const chat = arrayUtilities.findByPropValueEquality(
    userState.chats,
    privateId,
    "participantId"
  );

  if (!chat && !selectedContact) {
    return null;
  }

  return (
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
        <MessageList messages={chat?.messages || []} userState={userState} />
      </CustomBox>

      <CustomBox sx={{ width: "100%" }}>
        <MessageInput
          messageInputText={messageInputText}
          onAddNewMessage={handleAddNewMessage}
          onInputChange={handleInputChange}
        />
      </CustomBox>
    </CustomFlexBox>
  );
};

export default RightSideContainer;

import MessageInput from "components/rightSideComponents/MessageInput";
import MessageList from "components/rightSideComponents/MessageList";
import ChatBar from "components/rightSideComponents/ChatBar";

import { useMyContext } from "hooks/useMyContext";

import {
  contactClickAction,
  messageInputOnChangeAction,
} from "actions/tempActions";

import { initialContact } from "variables/initials/initialValues/initialValues";
import { sendNewMessageCrl } from "controllers/messageControllers/sendPrivateMessageCrl";
import { useEffect } from "react";
import { getAllChatMessagesCrl } from "controllers/messageControllers/getAllChatMessagesCrl";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomBox from "components/generals/boxes/CustomBox";

const RightSideContainer = () => {
  const {
    state: {
      tempState: {
        selectedContact: { firstName, lastName, privateID },
        selectedContact,
        messageInputText,
      },
      userState,
    },
    hooksOutput: { dispatch },
  } = useMyContext();

  useEffect(() => {
    try {
      const chat = userState.chats.find((chat) => {
        return chat.participants.find(
          (participant) => participant.participantID === privateID
        );
      });

      if (chat) {
        const intervalID = setInterval(() => {
          dispatch(getAllChatMessagesCrl({ chatID: chat.chatID }));
        }, 1000);

        return () => {
          clearInterval(intervalID);
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
    dispatch(sendNewMessageCrl());
  };

  const handleMessageContainerCloseClick = () => {
    dispatch(contactClickAction({ selectedContact: { ...initialContact } }));
  };

  //FIXME
  const chat = userState.chats.find((chat) => {
    return chat.participants.find(
      (participant) => participant.participantID === privateID
    );
  });

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

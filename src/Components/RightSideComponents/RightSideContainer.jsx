import { Box } from "@mui/material";

import MessageInput from "~/Components/RightSideComponents/MessageInput";
import MessageList from "~/Components/RightSideComponents/MessageList";
import ChatBar from "~/Components/RightSideComponents/ChatBar";

import { useMyContext } from "~/Hooks/useMyContext";

import {
  contactClickAction,
  messageInputOnChangeAction,
} from "~/Actions/TempActions/tempActions";

import { initialContact } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import { sendNewMessageCrl } from "~/Controllers/MessageControllers/sendPrivateMessageCrl";
import { useEffect } from "react";
import { getAllChatMessagesCrl } from "~/Controllers/MessageControllers/getAllChatMessagesCrl";

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
    <Box
      flexDirection="column"
      sx={{ width: "100%", height: "100%" }}
      justifyContent="space-between"
      alignItems="center"
      display="flex"
    >
      <Box sx={{ height: "50px", width: "100%" }}>
        <ChatBar
          onMessageContainerCloseClick={handleMessageContainerCloseClick}
          chatName={`${firstName} ${lastName}`}
        />
      </Box>

      <Box sx={{ height: "100%", width: "100%" }}>
        <MessageList messages={chat?.messages || []} userState={userState} />
      </Box>

      <Box sx={{ width: "100%" }}>
        <MessageInput
          messageInputText={messageInputText}
          onAddNewMessage={handleAddNewMessage}
          onInputChange={handleInputChange}
        />
      </Box>
    </Box>
  );
};

export default RightSideContainer;

import { sendPrivateMessageApi } from "~/Apis/MessageApis/sendPrivateMessageApi";

import { getInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { userAction } from "~/Actions/UserActions/userActions";
import { messageInputOnChangeAction } from "~/Actions/TempActions/tempActions";

const sendNewMessageCrl = () => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const {
        temp: {
          messageInputText,
          selectedContact: { privateID },
        },
        user,
      } = getState();

      const response = await sendPrivateMessageApi({
        participantID: privateID,
        message: messageInputText,
      });

      const { chatID, newMessage } = response.data;

      const copyUser = { ...user };

      const chatIndex = copyUser.chats?.findIndex(
        (chat) => chat?.chatID === chatID
      );

      if (chatIndex !== -1) {
        logger.log(chatIndex);
        const chat = copyUser.chats[chatIndex] || {
          chatID,
          messages: [newMessage],
        };
        const messages = handleAddNewMessage({
          newMessage,
          messages: chat.messages || [],
        });

        const newChat = { ...chat, messages };

        logger.log(newChat);
        copyUser.chats.splice(chatIndex, 1, newChat);

        logger.log(copyUser);
      }

      dispatch(userAction({ chats: copyUser.chats }));
      dispatch(messageInputOnChangeAction({ messageInputText: "" }));
    } catch (error) {
      logger.log("sendNewMessageCrl", error);
    }
  };
};

const handleAddNewMessage = ({ messages, newMessage }) => {
  const copyMessages = [...messages];

  copyMessages.push(newMessage);

  return copyMessages;
};

export { sendNewMessageCrl };

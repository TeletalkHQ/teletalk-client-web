import { userAction } from "actions/userActions";
import { messageInputOnChangeAction } from "actions/tempActions";

import { sendPrivateMessageApi } from "apis/messageApis";

import { getInitialState } from "variables/initials/initialStates/initialStates";

const sendPrivateMessageController = () => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const {
        temp: {
          messageInputText,
          selectedContact: { privateId },
        },
        user,
      } = getState();

      const response = await sendPrivateMessageApi.sendRequest({
        participantID: privateId,
        message: messageInputText,
      });

      const { chatID, newMessage } = response.data;

      const copyUser = { ...user };

      const chatIndex = copyUser.chats?.findIndex(
        (chat) => chat?.chatID === chatID
      );

      if (chatIndex !== -1) {
        console.log(chatIndex);
        const chat = copyUser.chats[chatIndex] || {
          chatID,
          messages: [newMessage],
        };
        const messages = handleAddNewMessage({
          newMessage,
          messages: chat.messages || [],
        });

        const newChat = { ...chat, messages };

        console.log(newChat);
        copyUser.chats.splice(chatIndex, 1, newChat);

        console.log(copyUser);
      }

      dispatch(userAction({ chats: copyUser.chats }));
      dispatch(messageInputOnChangeAction({ messageInputText: "" }));
    } catch (error) {
      console.log("sendPrivateMessageController", error);
    }
  };
};

const handleAddNewMessage = ({ messages, newMessage }) => {
  const copyMessages = [...messages];

  copyMessages.push(newMessage);

  return copyMessages;
};

export { sendPrivateMessageController };

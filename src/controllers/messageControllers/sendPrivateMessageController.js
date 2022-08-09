import { userActions } from "actions/userActions";
import { tempActions } from "actions/tempActions";

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
        participantId: privateId,
        message: messageInputText,
      });

      const { chatId, newMessage } = response.data;

      const copyUser = { ...user };

      const chatIndex = copyUser.chats?.findIndex(
        (chat) => chat?.chatId === chatId
      );

      if (chatIndex !== -1) {
        console.log(chatIndex);
        const chat = copyUser.chats[chatIndex] || {
          chatId,
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

      dispatch(userActions.userAction({ chats: copyUser.chats }));
      dispatch(
        tempActions.messageInputOnChangeAction({ messageInputText: "" })
      );
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

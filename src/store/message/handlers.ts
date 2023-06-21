import { MessageHandlers, MessageSetState } from "~/types";

export const handlers = (set: MessageSetState) =>
  ({
    setPrivateChats(privateChats) {
      set({
        privateChats,
      });
    },

    deselectChat() {
      set({
        selectedChat: {
          id: "",
        },
      });
    },

    addMessage(payload) {
      set((prevState) => {
        const { chatId, addedMessage } = payload;
        const copyPrivateChats = [...prevState.privateChats];
        const index = copyPrivateChats.findIndex(
          (item) => item.chatId === chatId
        );
        const chat = copyPrivateChats[index];
        const newChat = {
          ...chat,
          messages: [...chat.messages, addedMessage],
        };

        copyPrivateChats.splice(index, 1, newChat);
        return {
          privateChats: copyPrivateChats,
        };
      });
    },

    selectChat(id) {
      set({
        selectedChat: {
          id,
        },
      });
    },

    createNewPrivateChat(privateChat) {
      set((prevState) => ({
        privateChats: [...prevState.privateChats, privateChat],
      }));
    },

    messageInputOnChange(value) {
      set({
        messageInputTextValue: value,
      });
    },
  } as MessageHandlers);

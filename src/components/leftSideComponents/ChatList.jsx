import { List } from "@mui/material";

import { tempActions } from "actions/tempActions";
import { arrayUtilities } from "classes/ArrayUtilities";

import ChatListItem from "components/leftSideComponents/ChatListItem";

import { getAllChatMessagesController } from "controllers/messageControllers/getAllChatMessagesController";

import { useMainContext } from "hooks/useMainContext";

const ChatList = ({ chats = [], contacts, selectedContact }) => {
  const {
    hooksOutput: { dispatch },
    state: { userState },
  } = useMainContext();

  return (
    <>
      <List
        sx={{
          width: "80%",
          overflowY: "scroll",
          height: "100%",
          scrollBehavior: "smooth",
        }}
      >
        {(() => {
          try {
            const chatList = chats?.map((chat, index) => {
              const messages = chat.messages;

              if (arrayUtilities.arrayLength(messages)) {
                const lastMessage = arrayUtilities.arrayLastItem(messages);

                const senderId = lastMessage.messageSender.senderId;

                const sender =
                  contacts.find((contact) => contact.privateId === senderId) ||
                  userState;

                const findParticipant = chat.participants.find(
                  (participant) =>
                    participant?.participantId === selectedContact?.privateId
                );

                return (
                  <ChatListItem
                    key={index}
                    message={lastMessage.message}
                    name={`${sender?.firstName} ${sender?.lastName}`}
                    selected={!!findParticipant}
                    onChatListItemClick={() => {
                      dispatch(
                        tempActions.selectedContactId({
                          selectedContactId: senderId,
                        })
                      );

                      dispatch(
                        getAllChatMessagesController({ chatId: chat.chatId })
                      );
                    }}
                  />
                );
              }

              return null;
            });

            return chatList;
          } catch (error) {
            console.log("ChatList", error);
            return null;
          }
        })()}
      </List>
    </>
  );
};

export default ChatList;

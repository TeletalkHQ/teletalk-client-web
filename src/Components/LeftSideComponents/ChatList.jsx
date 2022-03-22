import { List } from "@mui/material";

import ChatListItem from "~/Components/LeftSideComponents/ChatListItem";

import { useMyContext } from "~/Hooks/useMyContext";

import { contactClickAction } from "~/Actions/TempActions/tempActions";
import { getAllChatMessagesCrl } from "~/Controllers/MessageControllers/getAllChatMessagesCrl";

const ChatList = ({ chats = [], contacts, selectedContact }) => {
  const {
    hooksOutput: { dispatch },
    state: { userState },
  } = useMyContext();

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

              if (messages?.length) {
                const lastMessage = messages[messages.length - 1];

                const senderID = lastMessage.messageSender.senderID;

                const sender =
                  contacts.find((contact) => contact.privateID === senderID) ||
                  userState;

                const findParticipant = chat.participants.find(
                  (participant) =>
                    participant?.participantID === selectedContact?.privateID
                );

                return (
                  <ChatListItem
                    key={index}
                    message={lastMessage.message}
                    name={`${sender?.firstName} ${sender?.lastName}`}
                    selected={!!findParticipant}
                    onChatListItemClick={() => {
                      dispatch(
                        contactClickAction({
                          selectedContact: sender,
                        })
                      );

                      dispatch(getAllChatMessagesCrl({ chatID: chat.chatID }));
                    }}
                  />
                );
              }

              return null;
            });

            return chatList;
          } catch (error) {
            logger.log("ChatList", error);
            return null;
          }
        })()}
      </List>
    </>
  );
};

export default ChatList;

import { tempActions } from "actions/tempActions";

import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import CustomList from "components/generals/boxes/CustomList";
import ChatListItem from "components/leftSideComponents/ChatListItem";

import { getAllChatMessagesController } from "controllers/messageControllers/getAllChatMessagesController";

import { printCatchError } from "functions/utilities/otherUtilities";

import { useMainContext } from "hooks/useMainContext";

const ChatList = ({ chats = [], contacts, selectedContact }) => {
  const {
    hooksOutput: { dispatch },
    state: { userState },
  } = useMainContext();

  return (
    <>
      <CustomList
        sx={{
          height: "100%",
          overflowY: "scroll",
          scrollBehavior: "smooth",
          width: "80%",
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
            printCatchError(ChatList.name, error);
            return null;
          }
        })()}
      </CustomList>
    </>
  );
};

export default ChatList;

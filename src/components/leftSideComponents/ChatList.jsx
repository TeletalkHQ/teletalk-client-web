import CustomList from "components/generals/boxes/CustomList";

import { printCatchError } from "functions/utilities/otherUtilities";

const ChatList = () => {
  return (
    <>
      <CustomList
        sx={{
          width: "80%",
          height: "100%",
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        {(() => {
          try {
            // const chatList = chats?.map((chat, index) => {
            //   const messages = chat.messages;
            //   if (arrayUtilities.arrayLength(messages)) {
            //     const lastMessage = arrayUtilities.arrayLastItem(messages);
            //     const senderId = lastMessage.messageSender.senderId;
            //     const sender =
            //       contacts.find((contact) => contact.privateId === senderId) ||
            //       userState;
            //     const findParticipant = chat.participants.find(
            //       (participant) =>
            //         participant?.participantId === selectedContact?.privateId
            //     );
            //     return (
            //       <ChatListItem
            //         key={index}
            //         message={lastMessage.message}
            //         name={`${sender?.firstName} ${sender?.lastName}`}
            //         selected={!!findParticipant}
            //         onChatListItemClick={() => {
            //           dispatch(
            //             actions.selectedContactId({
            //               selectedContactId: senderId,
            //             })
            //           );
            //           dispatch(
            //             getAllChatMessagesController({ chatId: chat.chatId })
            //           );
            //         }}
            //       />
            //     );
            //   }
            //   return null;
            // });
            // return chatList;
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

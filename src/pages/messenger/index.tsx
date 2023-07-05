import { useEffect } from "react";

import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import Box from "~/components/general/box";
import LeftSide from "~/containers/leftSide";
import Portal from "~/containers/portal";
import RightSide from "~/containers/rightSide";
import { useMessageStore, useUserStore } from "~/store";
import {
  EventName,
  GetPrivateChatIO,
  GetPrivateChatsIO,
  GetUserDataIO,
  SendPrivateMessageIO,
} from "~/types";

const Messenger = () => {
  const messageStore = useMessageStore();
  const userStore = useUserStore();

  useEffect(() => {
    handleUpdateUserData();
    handleJoinRoom();

    websocket.client.on<EventName>(
      "newPrivateChatMessage",
      async (data: SendPrivateMessageIO["output"]) => {
        if (messageStore.privateChats.some((i) => i.chatId === data.chatId))
          messageStore.addMessage(data);
        else {
          socketEmitterStore.events.getPrivateChat.emitFull<GetPrivateChatIO>(
            { chatId: data.chatId },
            async ({ data }) => {
              messageStore.setPrivateChats([
                ...messageStore.privateChats,
                data.privateChat,
              ]);

              return data;
            }
          );
        }
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userStore.userId) handleUpdatePrivateChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userId]);

  const handleUpdateUserData = async () => {
    await socketEmitterStore.events.getUserData.emitFull<GetUserDataIO>(
      {},
      async ({ data }) => {
        userStore.setUserData(data.user);

        return data;
      }
    );
  };

  const handleJoinRoom = () => {
    socketEmitterStore.events.joinRoom.emit();
  };

  const handleUpdatePrivateChats = async () => {
    await socketEmitterStore.events.getPrivateChats.emitFull<GetPrivateChatsIO>(
      {},
      async ({ data }) => {
        messageStore.setPrivateChats(data.privateChats);

        return data;
      }
    );
  };

  return (
    <Box.Grid
      container
      style={{
        height: "100vh",
      }}
    >
      <Portal />
      <LeftSide />
      <RightSide />
    </Box.Grid>
  );
};

export default Messenger;

// for (const item of data.privateChats) {
//             const participant = item.participants.find(
//               (i: ParticipantItem) => i.participantId !== userState.userId
//             )!;

//             const isUserExist = globalState.users.some(
//               (i) => i.userId === participant.participantId
//             );
//             if (isUserExist) continue;

//             const { publicUserData } =
//               await socketEmitterStore.events.getPublicUserData.emitFull<GetPublicUserDataIO>(
//                 {
//                   userId: participant.participantId,
//                 },
//                 async ({ data }) => {
//                   return {
//                     publicUserData: data.publicUserData,
//                   };
//                 }
//               );

//             globalState.addUser({
//               ...(publicUserData || {}),
//               countryCode: "",
//               countryName: "",
//               isContact: false,
//               phoneNumber: "",
//             });

//             return data;
//           }

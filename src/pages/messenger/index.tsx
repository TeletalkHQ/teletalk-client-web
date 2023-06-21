import { useEffect } from "react";

import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import Box from "~/components/general/box";
import { useGlobalStore, useMessageStore, useUserStore } from "~/store";
import { ContactItem, ParticipantItem, UserItem } from "~/types";

const Messenger = () => {
  const messageStore = useMessageStore();
  const globalState = useGlobalStore();
  const userState = useUserStore();

  useEffect(() => {
    const fn = async () => {
      //TODO: Update in/out events with events from server
      socketEmitterStore.events.joinRoom.emit();

      await socketEmitterStore.events.getPrivateChats.emitFull(
        undefined,
        async ({ data }) => {
          for (const item of data.privateChats) {
            const participant = item.participants.find(
              (i: ParticipantItem) => i.participantId !== userState.userId
            );

            const isUserExist = globalState.users.some(
              (i) => i.userId === participant.participantId
            );
            if (isUserExist) continue;

            const {
              data: { publicUserData },
            } = await socketEmitterStore.events.getPublicUserData.emitFull({
              userId: participant.participantId,
            });

            globalState.addUser(publicUserData);
          }

          messageStore.setPrivateChats(data.privateChats);
        }
      );

      socketEmitterStore.events.getUserData.emitFull({}, async ({ data }) => {
        //TODO: Update user data
        //TODO: Update users with contacts
        const users: UserItem[] = data.user.contacts.map(
          (item: ContactItem) => ({
            ...item,
            isContact: true,
          })
        );

        globalState.setUsers(users);
      });

      websocket.client.on("newPrivateChatMessage", (data) => {
        // const newPrivateChatMessage = ({ chatId, newMessage }) => {
        //   return (dispatch, getState) => {
        //     const state = getState();
        //     if (isChatExist(state, chatId))
        //       return dispatch(actions.addNewMessage({ chatId, newMessage }));
        //     websocket.client.emit("getChatInfo", { chatId }, (response) => {
        //       dispatch(
        //         actions.createNewPrivateChat({
        //           privateChat: {
        //             ...response.data.chatInfo,
        //             messages: [newMessage],
        //           },
        //         })
        //       );
        //     });
        //   };
        // };
        // const isChatExist = (state, chatId) =>
        //   messageState.privateChats.some((item) => item.chatId === chatId);
      });
    };

    fn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box.Grid
      container
      style={{
        height: "100vh",
      }}
    >
      {/* <LeftSide />
      <RightSide /> */}
    </Box.Grid>
  );
};

export default Messenger;

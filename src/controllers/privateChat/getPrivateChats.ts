import { trier } from "simple-trier";

import { actions } from "~/store/actions";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";

const getPrivateChats = () => {
  return async (dispatch, getState) => {
    await trier(getPrivateChats.name)
      .tryAsync(tryBlock, dispatch, getState)
      .runAsync();
  };
};

const tryBlock = async (dispatch, getState) => {
  const {
    global: { users },
    user: { userId },
  } = getState();
  socketEmitterStore.events.getPrivateChats.emitFull(
    undefined,
    async ({ data: { privateChats } }) => {
      for (const item of privateChats) {
        const participant = item.participants.find(
          (i) => i.participantId !== userId
        );

        const isUserExist = users.some(
          (i) => i.userId === participant.participantId
        );
        if (isUserExist) continue;

        const {
          data: { publicUserData },
        } = await apiManager.apis.getPublicUserData.sendFullFeaturedRequest({
          userId: participant.participantId,
        });

        dispatch(actions.addNewUser({ user: publicUserData }));
      }

      dispatch(
        actions.updateAllPrivateChats({
          privateChats,
        })
      );
    }
  );
};

export { getPrivateChats };

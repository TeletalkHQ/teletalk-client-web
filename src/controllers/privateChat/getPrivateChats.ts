import { trier } from "simple-trier";

import { actions } from "src/store/actions";
import { eventManager } from "src/classes/websocket/EventManager";
import { apiManager } from "src/classes/api/ApiManager";

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
  eventManager.events.getPrivateChats.emitFull(
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

import { trier } from "simple-trier";

import { actions } from "src/store/actions";
import { eventManager } from "src/classes/websocket/EventManager";

const getPrivateChats = () => {
  return async (dispatch) => {
    await trier(getPrivateChats.name).tryAsync(tryBlock, dispatch).runAsync();
  };
};

const tryBlock = async (dispatch) => {
  eventManager.events.getPrivateChats.emitFull(
    undefined,
    ({ data: { privateChats } }) => {
      dispatch(
        actions.updateAllPrivateChats({
          privateChats,
        })
      );
    }
  );
};

export { getPrivateChats };

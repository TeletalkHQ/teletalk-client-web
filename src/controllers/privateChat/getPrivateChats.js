import { trier } from "utility-store/src/classes/Trier";

import { websocket } from "src/classes/Websocket";

import { actions } from "src/store/actions";

const getPrivateChats = () => {
  return async (dispatch) => {
    await trier(getPrivateChats.name).tryAsync(tryBlock, dispatch).runAsync();
  };
};

const tryBlock = async (dispatch) => {
  websocket.client.emit("getPrivateChats", undefined, (privateChats) => {
    dispatch(
      actions.updateAllPrivateChats({
        privateChats,
      })
    );
  });
};

export { getPrivateChats };

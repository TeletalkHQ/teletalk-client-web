import { trier } from "utility-store/src/classes/Trier";

import { actions } from "src/store/actions";

const getPrivateChats = (socket) => {
  return async (dispatch) => {
    await trier(getPrivateChats.name)
      .tryAsync(tryBlock, socket, dispatch)
      .runAsync();
  };
};

const tryBlock = async (socket = ioSocket, dispatch) => {
  socket.emit("getPrivateChats", undefined, (privateChats) => {
    dispatch(
      actions.updateAllPrivateChats({
        privateChats,
      })
    );
  });
};

export { getPrivateChats };

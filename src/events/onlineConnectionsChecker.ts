import { windowUtilities } from "src/classes/WindowUtilities";

import { actions } from "src/store/actions";

const onlineStatusOnChangeEvent = (dispatch) => {
  const isOnline = windowUtilities.isOnline();
  dispatch(actions.onlineStatusChange({ isOnline }));
};

const addOnlineStatusOnChangeListener = (type, dispatch) =>
  windowUtilities.addEventListener(type, () =>
    onlineStatusOnChangeEvent(dispatch)
  );

const removeOnlineStatusOnChangeListener = (type, dispatch) =>
  windowUtilities.removeEventListener(type, () =>
    onlineStatusOnChangeEvent(dispatch)
  );

const addOnlineStatusEvents = (dispatch) => {
  removeOnlineStatusOnChangeListener("offline", dispatch);
  removeOnlineStatusOnChangeListener("online", dispatch);

  addOnlineStatusOnChangeListener("offline", dispatch);
  addOnlineStatusOnChangeListener("online", dispatch);
};

export { addOnlineStatusEvents };

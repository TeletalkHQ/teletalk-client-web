import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { actions } from "src/store/actions";

const onlineStatusOnChangeEvent = (dispatch) => {
  const isOnline = windowUtilities.isOnline();
  dispatch(actions.onlineStatusChange({ isOnline }));
};

const addOnlineStatusOnChangeListener = (type) =>
  windowUtilities.addEventListener(type, onlineStatusOnChangeEvent);

const removeOnlineStatusOnChangeListener = (type) =>
  windowUtilities.removeEventListener(type, onlineStatusOnChangeEvent);

const addOnlineStatusEvents = () => {
  removeOnlineStatusOnChangeListener("offline");
  removeOnlineStatusOnChangeListener("online");

  addOnlineStatusOnChangeListener("offline");
  addOnlineStatusOnChangeListener("online");
};

export { addOnlineStatusEvents };

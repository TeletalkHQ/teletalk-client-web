import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { actions } from "src/store/actions";

import { extractedDispatch } from "src/hooks/useThunkReducer";

const onlineStatusOnChangeEvent = () => {
  const isOnline = windowUtilities.isOnline();
  extractedDispatch(actions.onlineStatusChange({ isOnline }));
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

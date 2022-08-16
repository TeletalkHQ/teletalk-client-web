import { globalActions } from "actions/globalActions";
import { windowUtilities } from "classes/WindowUtilities";

import { extractedDispatch } from "hooks/useThunkReducer";

const onlineStatusOnChangeEvent = () => {
  const isOnline = windowUtilities.isOnline();

  extractedDispatch(globalActions.onlineStatusChangeAction({ isOnline }));
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

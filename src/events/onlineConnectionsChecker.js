import { globalActions } from "actions/globalActions";

import { extractedDispatch } from "hooks/useThunkReducer";

const onlineStatusOnChangeEvent = () => {
  const isOnline = window.navigator.onLine;

  extractedDispatch(globalActions.onlineStatusChangeAction({ isOnline }));
};

const addOnlineStatusOnChangeListener = (type) =>
  window.addEventListener(type, () => {
    onlineStatusOnChangeEvent();
  });

const removeEventListener = (type) =>
  window.removeEventListener(type, onlineStatusOnChangeEvent);

const addOnlineStatusEvents = () => {
  removeEventListener("offline");
  removeEventListener("online");

  addOnlineStatusOnChangeListener("offline");
  addOnlineStatusOnChangeListener("online");
};

export { addOnlineStatusEvents };

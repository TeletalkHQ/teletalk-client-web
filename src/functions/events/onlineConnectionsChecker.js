import { onlineStatusChangeAction } from "actions/globalActions";

import { appDispatch } from "functions/others/injectors/dispatchInjector";

const onlineConnectionChecker = () => {
  const eventListener = () => {
    const isOnline = window.navigator.onLine;

    appDispatch(onlineStatusChangeAction({ onlineStatus: { isOnline } }));
  };

  const addEventListener = (type) =>
    window.addEventListener(type, () => {
      eventListener();
    });

  const removeEventListener = (type) =>
    window.removeEventListener(type, eventListener);

  removeEventListener("offline");
  removeEventListener("online");

  addEventListener("offline");
  addEventListener("online");
};

export { onlineConnectionChecker };

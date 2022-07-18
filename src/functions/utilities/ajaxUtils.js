import { viewModeAction } from "actions/globalActions";
import { userAction } from "actions/userActions";

import { persistentStorage } from "classes/PersistentStorage";
import { notificationManager } from "classes/NotificationManager";

import { appDispatch } from "functions/others/injectors/dispatchInjector";
import { userInitializer } from "functions/helpers/userInitializer";

import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";

const responseChecker = (response) => {
  try {
    const statusCode = response.statusCode || response.status;

    if (statusCode >= 400) {
      if (statusCode === 401) {
        //TODO Add to app reset function
        persistentStorage.setDefaultStorage();
        appDispatch(userAction({ ...userInitializer() }));
        appDispatch(
          viewModeAction({
            viewMode: INITIAL_VIEW_MODE.SIGN_IN,
          })
        );
      } else {
        //...
      }

      const {
        data: { errors: responseErrors },
      } = response;

      const arrayOfErrors = Object.values(responseErrors);

      arrayOfErrors.forEach((errorItem) => {
        const {
          description,
          errorCode: notificationCode,
          message,
          reason: notificationReason,
        } = errorItem;

        notificationManager.submitErrorNotification({
          description,
          message: message || notificationReason,
          notificationCode,
          notificationReason,
        });
      });
    }

    return response;
  } catch (error) {
    console.log("responseChecker catch", error);
    throw error;
  }
};

export { responseChecker };

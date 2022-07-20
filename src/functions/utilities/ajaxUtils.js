import { viewModeAction } from "actions/globalActions";
import { userAction } from "actions/userActions";

import { persistentStorage } from "classes/PersistentStorage";
import { notificationManager } from "classes/NotificationManager";

import { appDispatch } from "functions/others/injectors/dispatchInjector";
import { userInitializer } from "functions/helpers/userInitializer";

import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";
import { assignFirstTruthyValue, renameObjectKey } from "./utilities";

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
        let finalErrorItem = {};

        finalErrorItem = renameObjectKey(
          errorItem,
          "errorCode",
          "notificationCode"
        );
        finalErrorItem = renameObjectKey(
          finalErrorItem,
          "reason",
          "notificationReason"
        );
        finalErrorItem = assignFirstTruthyValue(
          finalErrorItem,
          "message",
          finalErrorItem.message,
          finalErrorItem.notificationReason
        );

        notificationManager.submitErrorNotification(finalErrorItem);
      });
    }

    return response;
  } catch (error) {
    console.log("responseChecker catch", error);
    throw error;
  }
};

export { responseChecker };

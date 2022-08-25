import { userActions } from "actions/userActions";
import { commonFunctionalities } from "classes/CommonFunctionalities";
import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

import { getInitialState } from "variables/initials/initialStates/initialStates";

const sendPrivateMessageController = () => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const {
        temp: {
          messageInputText,
          selectedContact: { privateId },
        },
      } = getState();

      const response =
        await apiManager.apis.messageApis.sendPrivateMessageApi.sendFullFeaturedRequest(
          {
            message: messageInputText,
            participantId: privateId,
          }
        );

      const { chatId, newMessage } = response.data;
      dispatch(userActions.addNewMessageToChatAction({ chatId, newMessage }));

      commonFunctionalities.resetMessageInputText();
    } catch (error) {
      printCatchError(sendPrivateMessageController.name, error);
    }
  };
};

export { sendPrivateMessageController };

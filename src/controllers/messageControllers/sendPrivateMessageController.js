import { userActions } from "actions/userActions";
import { commonFunctionalities } from "classes/CommonFunctionalities";

import { sendPrivateMessageApi } from "apis/messageApis";

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

      const response = await sendPrivateMessageApi.sendRequest({
        message: messageInputText,
        participantId: privateId,
      });

      const { chatId, newMessage } = response.data;
      dispatch(userActions.addNewMessageToChatAction({ chatId, newMessage }));

      commonFunctionalities.resetMessageInputText();
    } catch (error) {
      console.log("sendPrivateMessageController", error);
    }
  };
};

export { sendPrivateMessageController };

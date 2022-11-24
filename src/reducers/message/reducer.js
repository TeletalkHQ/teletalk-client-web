import { appOptions } from "classes/AppOptions";

import { triers } from "functions/helpers/triers";

import { messageReducerHandlers } from "reducers/message/handlers";

import { initialStates } from "variables/initials/states";
import { initialActions } from "variables/initials/actions";

const messageReducer = (
  state = initialStates.message(),
  action = appOptions.getOptions().actionOptions
) => {
  return triers.reducerTrier({
    action,
    callerName: messageReducer.name,
    reducerCases: messageReducerCases,
    state,
  });
};

const messageReducerCases = {
  [initialActions.updatePrivateChatMessages.type]: (state, payload) =>
    messageReducerHandlers.handleUpdateChatMessages(state, payload),

  [initialActions.resetMessageState.type]: () => initialStates.message(),
};

export { messageReducer };

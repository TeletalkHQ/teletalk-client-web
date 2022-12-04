import { reducerBuilder } from "classes/ReducerBuilder";

import { initialMessageState } from "store/message/initialState";
import { messageReducerHandlers } from "store/message/handlers";
import { MESSAGE_ACTION_TYPES } from "store/message/types";

const messageReducerCases = {
  [MESSAGE_ACTION_TYPES.CLOSE_RIGHT_SIDE]:
    messageReducerHandlers.handleCloseRightSide,

  [MESSAGE_ACTION_TYPES.UPDATE_ALL_PRIVATE_CHATS]:
    messageReducerHandlers.handleUpdateAllPrivateChats,

  [MESSAGE_ACTION_TYPES.RESET_MESSAGE_STATE]: initialMessageState,

  [MESSAGE_ACTION_TYPES.MESSAGE_INPUT_ONCHANGE]: (payload) => payload,

  [MESSAGE_ACTION_TYPES.SELECTED_USER_FOR_PRIVATE_CHAT]:
    messageReducerHandlers.handleSelectedUserForPrivateChat,
};

const messageReducer = reducerBuilder
  .create()
  .reducerName("messageReducer")
  .initialState(initialMessageState())
  .reducerCases(messageReducerCases)
  .build();

export { messageReducer };

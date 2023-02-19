import { reducerBuilder } from "src/classes/ReducerBuilder";

import { initialMessageState } from "src/store/message/initialState";
import { messageReducerHandlers } from "src/store/message/handlers";
import { MESSAGE_ACTION_TYPES } from "src/store/message/types";

const messageReducerCases = {
  [MESSAGE_ACTION_TYPES.ADD_NEW_MESSAGE]:
    messageReducerHandlers.handleAddNewMessage,

  [MESSAGE_ACTION_TYPES.CLOSE_RIGHT_SIDE]:
    messageReducerHandlers.handleCloseRightSide,

  [MESSAGE_ACTION_TYPES.CREATE_NEW_PRIVATE_CHAT]:
    messageReducerHandlers.handleCreateNewPrivateChat,

  [MESSAGE_ACTION_TYPES.MESSAGE_INPUT_ONCHANGE]: (payload) => payload,

  [MESSAGE_ACTION_TYPES.UPDATE_ALL_PRIVATE_CHATS]:
    messageReducerHandlers.handleUpdateAllPrivateChats,

  [MESSAGE_ACTION_TYPES.RESET_MESSAGE_STATE]: initialMessageState,

  [MESSAGE_ACTION_TYPES.SELECTED_CHAT]:
    messageReducerHandlers.handleSetSelectedChat,
};

const messageReducer = reducerBuilder
  .create()
  .reducerName("messageReducer")
  .initialState(initialMessageState())
  .reducerCases(messageReducerCases)
  .build();

export { messageReducer };

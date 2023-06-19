import { reducerBuilder } from "~/classes/ReducerBuilder";
import { otherReducerHandlers } from "~/store/other/handlers";
import { initialOtherState } from "~/store/other/initialState";
import { OTHER_ACTION_TYPES } from "~/store/other/types";

const otherReducerCases = {
  [OTHER_ACTION_TYPES.SET_WELCOME_MESSAGE]: (payload) => payload,

  [OTHER_ACTION_TYPES.SET_COUNTRIES]: (payload) => payload,

  [OTHER_ACTION_TYPES.RESET_OTHER_STATE]: initialOtherState,

  [OTHER_ACTION_TYPES.IS_STUFF_IMPORTED]:
    otherReducerHandlers.handleStuffImported,
};

const otherReducer = reducerBuilder
  .create()
  .reducerName("otherReducer")
  .reducerCases(otherReducerCases)
  .initialState(initialOtherState())
  .build();

export { otherReducer };

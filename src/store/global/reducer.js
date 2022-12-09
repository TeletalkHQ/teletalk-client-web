import { reducerBuilder } from "src/classes/ReducerBuilder";

import { initialGlobalState } from "src/store/global/initialState";
import { GLOBAL_ACTION_TYPES } from "src/store/global/types";
import { globalReducerHandlers } from "src/store/global/handlers";

const globalReducerCases = {
  [GLOBAL_ACTION_TYPES.APP_DRAWER_OPEN_CHANGE]:
    globalReducerHandlers.handleAppDrawerStateOpenChange,

  [GLOBAL_ACTION_TYPES.APP_PROGRESSION_CHANGE]:
    globalReducerHandlers.handleAppProgressionChange,

  [GLOBAL_ACTION_TYPES.DIALOG_OPEN_STATE_CHANGE]:
    globalReducerHandlers.handleDialogOpenChange,

  [GLOBAL_ACTION_TYPES.GLOBAL_LOADING_OPEN_CHANGE]:
    globalReducerHandlers.handleGlobalLoadingStateOpenChange,

  [GLOBAL_ACTION_TYPES.ONLINE_STATUS_CHANGE]:
    globalReducerHandlers.handleOnlineStatusStateChange,

  [GLOBAL_ACTION_TYPES.VIEW_MODE_ONCHANGE]:
    globalReducerHandlers.handleUpdateViewMode,

  [GLOBAL_ACTION_TYPES.RESET_GLOBAL_STATE]:
    globalReducerHandlers.handleResetGlobalState,

  [GLOBAL_ACTION_TYPES.CHANGE_INITIAL_SETUP_STATUS]:
    globalReducerHandlers.changeInitialSetupStatus,
};

const globalReducer = reducerBuilder
  .create()
  .reducerName("globalReducer")
  .reducerCases(globalReducerCases)
  .initialState(initialGlobalState())
  .build();

export { globalReducer };

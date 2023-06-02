import { reducerBuilder } from "~/classes/ReducerBuilder";

import { initialSettingsState } from "~/store/settings/initialState";
import { settingsReducerHandlers } from "~/store/settings/handlers";
import { SETTINGS_TYPES } from "~/store/settings/types";

const settingsReducerCases = {
  [SETTINGS_TYPES.RESET_SETTINGS_STATE]: initialSettingsState,

  [SETTINGS_TYPES.UPDATE_PROFILE]: settingsReducerHandlers.updateProfile,
};

const settingsReducer = reducerBuilder
  .create()
  .reducerName("settingsReducer")
  .reducerCases(settingsReducerCases)
  .initialState(initialSettingsState())
  .build();

export { settingsReducer };

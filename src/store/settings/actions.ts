import { actionHandler } from "~/classes/ActionHandler";

import { SETTINGS_TYPES } from "~/store/settings/types";

const resetSettingsState = (payload) =>
  actionHandler(SETTINGS_TYPES.RESET_SETTINGS_STATE, payload);

const updateProfile = (payload) =>
  actionHandler(SETTINGS_TYPES.UPDATE_PROFILE, payload);

const settingsActions = {
  resetSettingsState,
  updateProfile,
};

export { settingsActions };

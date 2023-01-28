import { actionHandler } from "src/classes/ActionHandler";

import { SETTINGS_TYPES } from "src/store/settings/types";

const updateProfile = (payload) =>
  actionHandler(SETTINGS_TYPES.UPDATE_PROFILE, payload);

const settingsActions = { updateProfile };

export { settingsActions };

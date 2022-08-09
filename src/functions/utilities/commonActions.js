import { globalActions } from "actions/globalActions";

const authenticationProgressChange = (authenticationProgress) =>
  globalActions.appProgressionChange({ authenticationProgress });

const viewModeChange = (viewMode) =>
  globalActions.viewModeChangeAction({ viewMode });

export { authenticationProgressChange, viewModeChange };

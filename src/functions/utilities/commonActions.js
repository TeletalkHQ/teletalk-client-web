import { globalActions } from "actions/globalActions";

const authenticationProgressChange = (authenticationProgress) =>
  globalActions.appProgressionChange({ authenticationProgress });

//TODO Move to common functionality
const viewModeChange = (viewMode) =>
  globalActions.viewModeChangeAction({ viewMode });

export { authenticationProgressChange, viewModeChange };

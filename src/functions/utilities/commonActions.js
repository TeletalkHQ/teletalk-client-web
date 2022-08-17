import { globalActions } from "actions/globalActions";

const authenticationProgressChange = (authenticationProgress) =>
  globalActions.appProgressionChange({ authenticationProgress });

export { authenticationProgressChange };

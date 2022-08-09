const { globalActions } = require("actions/globalActions");

const authenticationProgressChange = (authenticationProgress) =>
  globalActions.appProgressionChange({ authenticationProgress });

export { authenticationProgressChange };

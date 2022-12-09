const APP_DRAWER_ANCHORS = {
  bottom: "bottom",
  left: "left",
  right: "right",
  top: "top",
};

const DIALOG_NAMES = {
  ADD_NEW_CONTACT: "addNewContact",
  CONTACTS: "contacts",
};

const GLOBAL_LOADING_TYPES = {
  FULL_PAGE: "FULL_PAGE",
  OVERLAY: "OVERLAY",
};

const INITIAL_SETUP_STATUS = {
  DONE: "DONE",
  FAILED: "FAILED",
  NEVER: "NEVER",
  ON_PROGRESS: "ON_PROGRESS",
  PROGRESSING: "PROGRESSING",
};

const VIEW_MODES = {
  INITIAL_SETUP: "INITIAL_SETUP",
  FULL_PAGE_LOADING: "FULL_PAGE_LOADING",
  MESSENGER: "MESSENGER",
  NEW_USER_PROFILE: "NEW_USER_PROFILE",
  SIGN_IN: "SIGN_IN",
  VERIFY_SIGN_IN: "VERIFY_SIGN_IN",
};

const globalStatics = {
  APP_DRAWER_ANCHORS,
  DIALOG_NAMES,
  GLOBAL_LOADING_TYPES,
  INITIAL_SETUP_STATUS,
  VIEW_MODES,
};

export { globalStatics };
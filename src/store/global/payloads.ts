import { GLOBAL_ACTION_TYPES } from "src/store/global/types";
import { fields } from "src/store/fields";

const globalActionPayloads = {
  [GLOBAL_ACTION_TYPES.APP_DRAWER_OPEN_CHANGE]: {
    open: fields.single.open,
  },

  [GLOBAL_ACTION_TYPES.ADD_NEW_CONTACT]: {
    newContact: fields.collection.newContact,
  },

  [GLOBAL_ACTION_TYPES.APP_PROGRESSION_CHANGE]: {
    authenticationProgress: fields.collection.authenticationProgress,
  },
  [GLOBAL_ACTION_TYPES.DIALOG_OPEN_STATE_CHANGE]: {
    dialogName: fields.single.dialogName,
    open: fields.single.open,
    props: fields.collection.dialogProps,
  },
  [GLOBAL_ACTION_TYPES.GLOBAL_LOADING_OPEN_CHANGE]: {
    open: fields.single.open,
  },
  [GLOBAL_ACTION_TYPES.ONLINE_STATUS_CHANGE]: {
    isOnline: fields.single.isOnline,
  },
  [GLOBAL_ACTION_TYPES.VIEW_MODE_ONCHANGE]: {
    viewMode: fields.single.viewMode,
  },
  [GLOBAL_ACTION_TYPES.RESET_GLOBAL_STATE]: undefined,
  [GLOBAL_ACTION_TYPES.CHANGE_INITIAL_SETUP_STATUS]: {
    status: fields.single.status,
  },
};

export { globalActionPayloads };

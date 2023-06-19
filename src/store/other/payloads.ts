import { fields } from "~/store/fields";
import { OTHER_ACTION_TYPES } from "~/store/other/types";

const otherActionPayloads = {
  [OTHER_ACTION_TYPES.SET_COUNTRIES]: {
    countries: fields.collection.countries,
  },

  [OTHER_ACTION_TYPES.RESET_OTHER_STATE]: undefined,

  [OTHER_ACTION_TYPES.SET_WELCOME_MESSAGE]: {
    welcomeMessage: fields.single.welcomeMessage,
  },

  [OTHER_ACTION_TYPES.IS_STUFF_IMPORTED]: {
    isStuffImported: fields.single.isStuffImported,
  },
};

export { otherActionPayloads };

import { OTHER_ACTION_TYPES } from "src/store/other/types";

import { fields } from "src/store/fields";

const otherActionPayloads = {
  [OTHER_ACTION_TYPES.SET_COUNTRIES]: {
    countries: fields.collection.countries,
  },
  [OTHER_ACTION_TYPES.RESET_OTHER_STATE]: undefined,
  [OTHER_ACTION_TYPES.SET_WELCOME_MESSAGE]: {
    welcomeMessage: fields.single.welcomeMessage,
  },
};

export { otherActionPayloads };

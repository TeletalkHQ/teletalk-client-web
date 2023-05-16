import { SETTINGS_TYPES } from "src/store/settings/types";
import { fields } from "src/store/fields";

const settingsActionPayload = {
  [SETTINGS_TYPES.UPDATE_PROFILE]: {
    profile: {
      ...fields.collection.cellphone,
      ...fields.collection.fullName,
      bio: fields.single.bio,
      username: fields.single.username,
    },
  },
};

export { settingsActionPayload };

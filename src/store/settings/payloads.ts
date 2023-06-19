import { fields } from "~/store/fields";
import { SETTINGS_TYPES } from "~/store/settings/types";

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

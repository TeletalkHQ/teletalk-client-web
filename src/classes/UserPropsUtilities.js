import { UserPropsUtilities as UserPropsUtilitiesMain } from "utility-store/src/classes/UserPropsUtilities";

import { persistentStorage } from "classes/PersistentStorage";

import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/constants";

class UserPropsUtilities extends UserPropsUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  getVerifyTokenFromStorage() {
    return persistentStorage.getItem(PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN);
  }
  removeVerifyTokenFromStorage() {
    persistentStorage.removeItem(PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN);
  }

  getMainTokenFromStorage() {
    return persistentStorage.getItem(PERSISTENT_STORAGE_KEYS.MAIN_TOKEN);
  }
  removeMainTokenFromStorage() {
    persistentStorage.removeItem(PERSISTENT_STORAGE_KEYS.MAIN_TOKEN);
  }
}

const userPropsUtilities = new UserPropsUtilities();

export { userPropsUtilities };

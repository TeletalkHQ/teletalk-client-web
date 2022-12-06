import { UserPropsUtilities as UserPropsUtilitiesMain } from "utility-store/src/classes/UserPropsUtilities";

import { persistentStorage } from "classes/PersistentStorage";

class UserPropsUtilities extends UserPropsUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  getTokenFromStorage() {
    return persistentStorage.getItem(persistentStorage.STORAGE_KEYS.TOKEN);
  }
  removeTokenFromStorage() {
    persistentStorage.removeItem(persistentStorage.STORAGE_KEYS.TOKEN);
  }
}

const userPropsUtilities = new UserPropsUtilities();

export { userPropsUtilities };

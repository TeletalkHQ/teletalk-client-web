import { UserPropsUtilities as UserPropsUtilitiesMain } from "utility-store/src/classes/UserPropsUtilities";

import { persistentStorage } from "classes/PersistentStorage";

class UserPropsUtilities extends UserPropsUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  getVerifyTokenFromStorage() {
    return persistentStorage.getItem(
      persistentStorage.storageKeys.VERIFY_TOKEN
    );
  }
  removeVerifyTokenFromStorage() {
    persistentStorage.removeItem(persistentStorage.storageKeys.VERIFY_TOKEN);
  }

  getMainTokenFromStorage() {
    return persistentStorage.getItem(persistentStorage.storageKeys.MAIN_TOKEN);
  }
  removeMainTokenFromStorage() {
    persistentStorage.removeItem(persistentStorage.storageKeys.MAIN_TOKEN);
  }
}

const userPropsUtilities = new UserPropsUtilities();

export { userPropsUtilities };

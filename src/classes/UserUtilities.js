import { UserUtilities as UserUtilitiesMain } from "utility-store/src/classes/UserUtilities";

import { persistentStorage } from "src/classes/PersistentStorage";

class UserUtilities extends UserUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  getToken() {
    return persistentStorage.getItem(persistentStorage.STORAGE_KEYS.TOKEN);
  }
  removeToken() {
    persistentStorage.removeItem(persistentStorage.STORAGE_KEYS.TOKEN);
  }
  saveToken(token) {
    persistentStorage.setItem(persistentStorage.STORAGE_KEYS.TOKEN, token);
  }
}

const userUtilities = new UserUtilities();

export { userUtilities };

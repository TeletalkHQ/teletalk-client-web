import { dataUsageManager } from "classes/DataUsageManager";
import { persistentStorage } from "classes/PersistentStorage";
import { randomMaker } from "classes/RandomMaker";
import { stuffStore } from "classes/StuffStore";

import { printCatchError } from "functions/utilities/otherUtilities";

import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/constants";

class UserPropsUtilities {
  constructor(id) {
    this.id = id;
  }

  makeTestCellphone(countries) {
    const country = countries[randomMaker.randomCountryCode()];
    const cellphone = this.makeCellphoneByParams(
      country.countryCode,
      country.countryName,
      randomMaker.randomStringNumber(10)
    );

    return cellphone;
  }

  makeUnusedTestCellphone(countries) {
    const cellphone = this.makeTestCellphone(countries);

    const isCellphoneUsedBefore =
      dataUsageManager.isCellphoneUsedBefore(cellphone);

    if (isCellphoneUsedBefore) {
      this.makeUnusedTestCellphone(countries);
    } else return cellphone;
  }

  makeUnusedTestCellphoneAndUpdateUsage(countries) {
    const unusedCellphone = this.makeUnusedTestCellphone(countries);

    dataUsageManager.addUsedCellphone(unusedCellphone);

    return unusedCellphone;
  }

  makeCellphoneByParams(countryCode, countryName, phoneNumber) {
    return {
      countryCode,
      countryName,
      phoneNumber,
    };
  }

  makeTestContact(countries) {
    return {
      ...this.makeTestCellphone(countries),
      firstName: randomMaker.randomString(
        stuffStore.models.firstNameModel.maxlength.value
      ),
      lastName: randomMaker.randomString(
        stuffStore.models.lastNameModel.maxlength.value
      ),
    };
  }

  makeContactByParams(cellphone, firstName, lastName) {
    return {
      ...cellphone,
      firstName,
      lastName,
    };
  }

  makeFullNameByParam(firstName, lastName) {
    return { firstName, lastName };
  }
  makeTestFullName() {
    return this.makeFullNameByParam(
      randomMaker.randomString(
        stuffStore.models.firstNameModel.maxlength.value
      ),
      randomMaker.randomString(stuffStore.models.lastNameModel.maxlength.value)
    );
  }

  extractCellphone(object = {}) {
    return {
      countryCode: object.countryCode,
      countryName: object.countryName,
      phoneNumber: object.phoneNumber,
    };
  }
  extractContact(object = {}) {
    return {
      ...this.extractCellphone(object),
      firstName: object.firstName,
      lastName: object.lastName,
      privateId: object.privateId,
    };
  }

  extractDefaultUserProperties(userObject) {
    const {
      bio,
      blacklist,
      chats,
      contacts,
      countryCode,
      countryName,
      firstName,
      lastName,
      phoneNumber,
      privateId,
      tokens,
      username,
    } = userObject;

    return {
      bio,
      blacklist,
      chats,
      contacts,
      countryCode,
      countryName,
      firstName,
      lastName,
      phoneNumber,
      privateId,
      tokens,
      username,
    };
  }

  getTokenFromUserObjectByParam(userObject) {
    return userObject.tokens[0]?.mainToken;
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

  cellphoneFinder(cellphones, targetCellphone) {
    let cellphoneIndex = -1;

    try {
      const cellphone = cellphones.find((cellphone, index) => {
        cellphoneIndex = index;
        return this.isDataHasEqualityWithTargetCellphone(
          cellphone,
          targetCellphone
        );
      });
      return { cellphone, cellphoneIndex };
    } catch (error) {
      printCatchError(this.cellphoneFinder.name, error);
      throw error;
    }
  }

  isDataHasEqualityWithTargetCellphone(data, targetCellphone) {
    if (
      data.phoneNumber === targetCellphone.phoneNumber &&
      data.countryCode === targetCellphone.countryCode &&
      data.countryName === targetCellphone.countryName
    ) {
      return true;
    }

    return false;
  }
}

const userPropsUtilities = new UserPropsUtilities();

export { userPropsUtilities };

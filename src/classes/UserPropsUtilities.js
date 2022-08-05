import { randomMaker } from "classes/RandomMaker";
import { dataUsageManager } from "classes/DataUsageManager";
import { stuffStore } from "classes/StuffStore";
import { persistentStorage } from "classes/PersistentStorage";

import { PERSISTENT_STORAGE_KEYS } from "variables/initials/initialValues/initialValues";

const { firstNameModel, lastNameModel } = stuffStore.models;

class UserPropsUtilities {
  constructor(id) {
    this.id = id;
  }

  makeTestCellphone() {
    // const country = countries[randomMaker.randomCountryCode()];
    // const cellphone = this.makeCellphoneByParams(
    //   country.countryCode,
    //   country.countryName,
    //   randomMaker.randomStringNumber(10)
    // );
    // return cellphone;
  }

  makeUnusedTestCellphone() {
    const cellphone = this.makeTestCellphone();

    const isCellphoneUsedBefore =
      dataUsageManager.isCellphoneUsedBefore(cellphone);

    if (isCellphoneUsedBefore) {
      this.makeUnusedTestCellphone();
    } else return cellphone;
  }

  makeUnusedTestCellphoneAndUpdateUsage() {
    const unusedCellphone = this.makeUnusedTestCellphone();

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

  makeTestContact() {
    return {
      ...this.makeTestCellphone(),
      firstName: randomMaker.randomString(firstNameModel.maxlength.value),
      lastName: randomMaker.randomString(lastNameModel.maxlength.value),
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
      randomMaker.randomString(firstNameModel.maxlength.value),
      randomMaker.randomString(lastNameModel.maxlength.value)
    );
  }

  makeCellphoneByObjectParam(object = {}) {
    return {
      countryCode: object.countryCode,
      countryName: object.countryName,
      phoneNumber: object.phoneNumber,
    };
  }
  makeContactObjectByParam(object = {}) {
    return {
      ...this.makeCellphoneByObjectParam(object),
      firstName: object.firstName,
      lastName: object.lastName,
      privateId: object.privateId,
    };
  }

  makeDefaultUserObjectByParam(userObject) {
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
      logger.log("cellphoneFinder catch, error:", error);
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

  makeDefaultUserState() {
    return {
      bio: "",
      blacklist: [],
      chats: [],
      contacts: [],
      countryCode: "",
      countryName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      privateId: "",
      username: "",
    };
  }
}

const userPropsUtilities = new UserPropsUtilities();

export { userPropsUtilities };

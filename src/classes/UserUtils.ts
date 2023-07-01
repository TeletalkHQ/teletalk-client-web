import { UserUtils as userUtilsMain } from "utility-store";
import {
  ExtendedCellphone,
  ExtendedFullName,
  UserData,
} from "utility-store/lib/types";

import { UserState } from "~/types";

class UserUtils extends userUtilsMain {
  concatFirstNameWithLastName(data: ExtendedFullName) {
    return `${data.firstName} ${data.lastName}`;
  }

  concatCountryCodeWithPhoneNumber(data: ExtendedCellphone) {
    return `+${data.countryCode} ${data.phoneNumber}`;
  }

  makeEmptyContact() {
    return {
      ...super.makeEmptyContact(),
      isContact: false,
      userId: "",
    };
  }

  makeEmptyAddingContact() {
    return {
      ...super.makeEmptyCellphone(),
      ...super.makeEmptyFullName(),
    };
  }

  extractUserData(data: UserState) {
    return super.extractUserData(data as UserData);
  }
}

const userUtils = new UserUtils();

export { userUtils };

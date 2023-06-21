import { UserUtilities } from "utility-store";
import {
  ExtendedCellphone,
  ExtendedFullName,
  UserData,
} from "utility-store/lib/types";

import { UserState } from "~/types";

class UserUtils extends UserUtilities {
  concatFirstNameWithLastName(data: ExtendedFullName) {
    return `${data.firstName} ${data.lastName}`;
  }

  concatCountryCodeWithPhoneNumber(data: ExtendedCellphone) {
    return `+${data.countryCode} ${data.phoneNumber}`;
  }

  makeEmptyContactWithCellphone() {
    return {
      ...super.makeEmptyContactWithCellphone(),
      isContact: false,
      userId: "",
    };
  }

  extractUserData(data: UserState) {
    return super.extractUserData(data as UserData);
  }
}

const userUtils = new UserUtils();

export { userUtils };

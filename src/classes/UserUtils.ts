import { UserUtilities } from "utility-store";
import { ExtendedCellphone, ExtendedFullName } from "utility-store/lib/types";

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
}

const userUtils = new UserUtils();

export { userUtils };

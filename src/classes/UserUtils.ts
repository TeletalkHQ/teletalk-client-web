import { UserUtils as userUtilsMain } from "utility-store";
import { ExtendedCellphone, ExtendedFullName } from "utility-store/lib/types";

class UserUtils extends userUtilsMain {
  concatFirstNameWithLastName(data: ExtendedFullName) {
    return `${data.firstName} ${data.lastName}`;
  }

  concatCountryCodeWithPhoneNumber(data: ExtendedCellphone) {
    return `+${data.countryCode} ${data.phoneNumber}`;
  }
}

const userUtils = new UserUtils();

export { userUtils };

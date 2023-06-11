import { UserUtilities as UserUtilitiesMain } from "utility-store";
import { ExtendedCellphone, ExtendedFullName } from "utility-store/lib/types";

class UserUtilities extends UserUtilitiesMain {
  concatFirstNameWithLastName(data: ExtendedFullName) {
    return `${data.firstName} ${data.lastName}`;
  }
  concatCountryCodeWithPhoneNumber(data: ExtendedCellphone) {
    return `+${data.countryCode} ${data.phoneNumber}`;
  }
}

const userUtilities = new UserUtilities();

export { userUtilities };

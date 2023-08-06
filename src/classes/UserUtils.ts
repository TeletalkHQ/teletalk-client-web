import { UserUtils as userUtilsMain } from "utility-store";
import { ExtendedCellphone } from "utility-store/lib/types";

import { UserItem } from "~/types";

export class UserUtils extends userUtilsMain {
  concatFirstNameWithLastName(userItem: Partial<UserItem>) {
    const fn = userItem.firstName || userItem.originalFirstName || "";
    const ln = userItem.lastName || userItem.originalLastName || "";

    return `${fn} ${ln}`;
  }

  concatCountryCodeWithPhoneNumber(data: ExtendedCellphone) {
    if (!data.countryCode || !data.phoneNumber) return "";
    return `+${data.countryCode} ${data.phoneNumber}`;
  }
}

export const userUtils = new UserUtils();

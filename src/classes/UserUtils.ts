import { UserUtils as userUtilsMain } from "utility-store";
import { ExtendedCellphone } from "utility-store/lib/types";

import { UserItem, UserPublicData } from "~/types";

export class UserUtils extends userUtilsMain {
  concatFirstNameWithLastName(
    userItem: Partial<UserItem>,
    publicData?: UserPublicData
  ) {
    const fn =
      userItem.firstName ||
      userItem.originalFirstName ||
      publicData?.firstName ||
      "";
    const ln =
      userItem.lastName ||
      userItem.originalLastName ||
      publicData?.lastName ||
      "";

    return `${fn} ${ln}`;
  }

  concatCountryCodeWithPhoneNumber(
    data: ExtendedCellphone,
    fallbackValue = ""
  ) {
    if (!data.countryCode || !data.phoneNumber) return fallbackValue;
    return `+${data.countryCode} ${data.phoneNumber}`;
  }
}

export const userUtils = new UserUtils();

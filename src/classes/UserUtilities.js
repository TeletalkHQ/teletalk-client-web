import { UserUtilities as UserUtilitiesMain } from "utility-store/src/classes/UserUtilities";

class UserUtilities extends UserUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  makeFullName(data) {
    return `${data.firstName} ${data.lastName}`;
  }
  makeFullNumber(data) {
    return `+${data.countryCode} ${data.phoneNumber}`;
  }
}

const userUtilities = new UserUtilities();

export { userUtilities };

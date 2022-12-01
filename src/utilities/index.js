import { apiUtilities } from "utilities/api";
import { otherUtilities } from "utilities/other";
import { versionUtilities } from "utilities/version";

const utilities = {
  ...apiUtilities,
  ...otherUtilities,
  ...versionUtilities,
};

export { utilities };

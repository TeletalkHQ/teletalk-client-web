import { apiUtilities } from "src/utilities/api";
import { otherUtilities } from "src/utilities/other";
import { versionUtilities } from "src/utilities/version";

const utilities = {
  ...apiUtilities,
  ...otherUtilities,
  ...versionUtilities,
};

export { utilities };

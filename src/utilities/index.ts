import { apiUtilities } from "src/utilities/api";
import { otherUtilities } from "src/utilities/other";

const utilities = {
  ...apiUtilities,
  ...otherUtilities,
};

export { utilities };

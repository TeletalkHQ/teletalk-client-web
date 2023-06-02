import { apiUtilities } from "~/utilities/api";
import { otherUtilities } from "~/utilities/other";

const utilities = {
  ...apiUtilities,
  ...otherUtilities,
};

export { utilities };

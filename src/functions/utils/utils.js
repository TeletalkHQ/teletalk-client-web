import { regexs } from "~/variables/constants/others/regexs";

const isNumber = ({ value }) => {
  return regexs.enNumberRegex.test(value);
};

const utils = {
  isNumber,
};

export { utils, isNumber };

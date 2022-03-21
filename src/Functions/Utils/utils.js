import { regexs } from "~/Variables/Constants/Others/regexes";

const isNumber = ({ value }) => {
  return regexs.enNumberRegex.test(value);
};

const utils = {
  isNumber,
};

export { utils, isNumber };

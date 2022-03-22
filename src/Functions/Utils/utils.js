import { regexs } from "~/Variables/Constants/Others/regexs";

const isNumber = ({ value }) => {
  return regexs.enNumberRegex.test(value);
};

const getApiUrl = (baseUrl, templateItem) =>
  `${baseUrl.properties.route}${templateItem.properties.route}`;

const getApiMethod = (templateItem) => templateItem.properties.method;

const getApiUrlAndMethod = (baseUrl, templateItem) => ({
  url: getApiUrl(baseUrl, templateItem),
  method: getApiMethod(templateItem),
});

const utils = {
  isNumber,
  getApiUrl,
  getApiMethod,
  getApiUrlAndMethod,
};

export { utils, isNumber, getApiUrl, getApiMethod, getApiUrlAndMethod };

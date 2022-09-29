/* eslint-disable no-extend-native */
import { customTypeof } from "utility-store/src/classes/CustomTypeof";

//TODO Add this to ArrayUtilities and remove custom prototypes
Array.prototype.isMethod = function (methodName) {
  if (customTypeof.isFunction(this[methodName])) {
    return this;
  } else {
    return false;
  }
};

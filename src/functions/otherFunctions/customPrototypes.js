/* eslint-disable no-extend-native */
import { customTypeof } from "utility-store/src/classes/CustomTypeof";

Array.prototype.isMethod = function (methodName) {
  if (customTypeof.check(this[methodName]).type.isFunction) {
    return this;
  } else {
    return false;
  }
};

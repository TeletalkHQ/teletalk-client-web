/* eslint-disable no-extend-native */

const { customTypeof } = require("classes/CustomTypeof");

Array.prototype.isMethod = function (methodName) {
  if (customTypeof.check(this[methodName]).type.function) {
    return this;
  } else {
    return false;
  }
};

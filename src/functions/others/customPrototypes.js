/* eslint-disable no-extend-native */

Array.prototype.isMethod = function (methodName) {
  if (typeof this[methodName] === "function") {
    return this;
  } else {
    return false;
  }
};

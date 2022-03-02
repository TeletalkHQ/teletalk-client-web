
Array.prototype.isMethod = function (methodName) {
	if (typeof this[methodName] === "function") {
		return this;
	} else {
		return false;
	}
};

const renameKey = ({ obj, oldKey, newKey }) => {
	if (oldKey !== newKey) {
		// Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey));
		// delete obj[oldKey];
		obj[newKey] = obj[oldKey];
		delete obj[oldKey];
	}
	return obj;
};

export { renameKey };

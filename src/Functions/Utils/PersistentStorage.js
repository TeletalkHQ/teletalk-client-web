//TODO Args controller
function PersistentStorage() {
	try {
		this.storage = localStorage;

		this.clear = () => {
			this.storage.clear();

			return this;
		};

		this.removeItem = ({ key = "" }) => {
			this.storage.removeItem(key);

			return this;
		};

		this.setItem = ({ key = "", value = "" }) => {
			this.storage.setItem(key, value);

			return this;
		};

		this.getItem = ({ key = "" }) => {
			const item = this.storage.getItem(key);

			return item;
		};
	} catch (error) {
		console.log("PersistentStorage catch", error);
	}
	return this;
}

const Storage = new PersistentStorage();

export { Storage as PersistentStorage };

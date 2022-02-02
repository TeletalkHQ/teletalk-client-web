import { produce } from "immer";

const copyMan = ({ state, cb }) => {
	try {
		if (!state) {
			const error = "You Forget to send me state!";
			throw error;
		}

		if (!cb) {
			const error = "You Forget to send me callback (cb)!";
			throw error;
		}

		const nextState = produce(state, cb);

		return { nextState };
	} catch (error) {
		console.log("copyMan catch", error);
	}
};

const newStateReplacer = ({ state, payload }) => ({ ...state, ...payload });

export { copyMan, newStateReplacer };

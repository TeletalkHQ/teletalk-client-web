import { userInitializer } from "~/Functions/Helpers/userInitializer";

const userInitialState = {
	...userInitializer(),
};
export { userInitialState };

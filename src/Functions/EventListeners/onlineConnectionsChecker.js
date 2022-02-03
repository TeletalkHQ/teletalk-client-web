import { onlineStatusOnChange } from "~/Actions/TempActions/tempActions";
import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";

const onlineConnectionChecker = () => {
	const eventListener = () => {
		const isOnline = window.navigator.onLine;

		appDispatch(onlineStatusOnChange({ onlineStatus: { isOnline } }));
	};

	const addEventListener = (type) =>
		window.addEventListener(type, () => {
			eventListener();
		});

	const removeEventListener = (type) => window.removeEventListener(type, eventListener);

	removeEventListener("offline");
	removeEventListener("online");

	addEventListener("offline");
	addEventListener("online");
};

export { onlineConnectionChecker };

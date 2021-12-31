import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";

let timeoutID = null;

const onlineConnectionChecker = () => {
	const clearLastTimeOut = () => clearTimeout(timeoutID);

	const eventListener = () => {
		clearLastTimeOut();
		const status = window.navigator.onLine;
		appDispatch({
			onlineStatusCondition: window.navigator.onLine,
			status,
		});

		!status && appDispatch("لطفا اتصال اینترنت خود را بررسی کنید");

		timeoutID = setTimeout(() => {
			status && appDispatch({ onlineStatusCondition: false, status: null });
		}, 4000);
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

const onlineConnectionCheckerClearTimeout = () => {
	clearTimeout(timeoutID);
};

export { onlineConnectionCheckerClearTimeout, onlineConnectionChecker };

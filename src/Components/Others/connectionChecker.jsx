import { useEffect, useState } from "react";

import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";

const ConnectionChecker = () => {
	//TODO Move it to global
	const [{ condition, status }, setNetwork] = useState({
		condition: !window.navigator.onLine,
		status: window.navigator.onLine,
	});

	useEffect(() => {
		let timeoutID = null;

		const clearLastTimeOut = () => clearTimeout(timeoutID);

		const eventListener = () => {
			clearLastTimeOut();
			const status = window.navigator.onLine;
			setNetwork({
				condition: window.navigator.onLine,
				status,
			});

			!status && appDispatch("لطفا اتصال اینترنت خود را بررسی کنید");

			timeoutID = setTimeout(() => {
				status && setNetwork({ condition: false, status: null });
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

		return () => {
			clearLastTimeOut();
		};
	}, []);

	return (
		condition && (
			<div
				className={`internet-connection-status ${
					status ? "internet-is-back" : "internet-is-lost"
				}`}
				id="internetStatus"
			>
				اتصال اینترنت شما برقرار شد
			</div>
		)
	);
};
export default ConnectionChecker;

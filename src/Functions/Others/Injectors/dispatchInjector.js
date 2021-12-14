const initialOptions = { type: "", payload: "" };

let appDispatch = (action = initialOptions) => {};

const dispatchInjector = ({ dispatch }) => {
	appDispatch = (action) => {
		try {
			if (!action) {
				const error = "Yo! you must provide action!";
				throw error;
			}

			const finalAction = { ...initialOptions, ...action };

			if (!finalAction.type && typeof action === "object") {
				const error = "Yo! you must provide action type";
				throw error;
			}

			dispatch(finalAction);
		} catch (error) {
			console.log("appDispatch catch", error);
		}
	};
};

export { dispatchInjector, appDispatch };

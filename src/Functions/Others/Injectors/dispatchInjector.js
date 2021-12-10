const initialOptions = { type: "", payload: "" };

let appDispatch = (action = initialOptions) => {};

const dispatchInjector = ({ dispatch }) => {
	appDispatch = (action) => {
		const data = { ...initialOptions, ...action };

		try {
			if (!data.type) {
				const error = "Yo! you must provide action type";
				throw error;
			}

			dispatch(data);
		} catch (error) {}
	};
};

export { dispatchInjector, appDispatch };

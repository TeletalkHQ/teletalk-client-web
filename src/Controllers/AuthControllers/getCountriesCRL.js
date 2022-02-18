import { getCountriesAction } from "~/Actions/OtherActions/otherActions";

import { getCountriesAPI } from "~/APIs/Authentication/getCountriesAPI";

const getCountriesCRL = () => {
	return async (dispatch, getState) => {
		try {
			const response = await getCountriesAPI();

			dispatch(getCountriesAction({ countries: response.data.countries }));
		} catch (error) {
			console.log("getCountriesCRL", error);
		}
	};
};

export { getCountriesCRL };

import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import {
	initialContact,
	initialCountry,
} from "~/Variables/Constants/Initials/InitialValues/initialValues";

const {
	other: { welcome, countries },
} = INITIAL_STATE;

const otherInitialActions = {
	getCountriesInitialAction: {
		type: "GET_COUNTRIES",
		payload: {
			countries,
		},
	},

	selectContactInitialAction: {
		type: "SELECT_CONTACT",
		payload: initialContact,
	},

	selectedCountryInitialAction: {
		type: "SELECTED_COUNTRY_ONCHANGE",
		payload: { selectedCountry: initialCountry },
	},
	welcomeInitialAction: {
		type: "WELCOME",
		payload: welcome,
	},
};

export { otherInitialActions };
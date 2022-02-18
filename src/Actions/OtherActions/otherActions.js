import { actionCreator } from "~/Functions/Utils/actionCreator";

import { otherInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";

const { getCountriesInitialAction, selectedCountryInitialAction, welcomeInitialAction } =
	otherInitialActions;

const getCountriesAction = (payload = getCountriesInitialAction.payload) =>
	actionCreator(getCountriesInitialAction.type, payload);

const selectedCountryAction = (payload = selectedCountryInitialAction.payload) =>
	actionCreator(selectedCountryInitialAction.type, payload);

const welcomeAction = (payload = welcomeInitialAction.payload) =>
	actionCreator(welcomeInitialAction.type, payload);

export { getCountriesAction, selectedCountryAction, welcomeAction };

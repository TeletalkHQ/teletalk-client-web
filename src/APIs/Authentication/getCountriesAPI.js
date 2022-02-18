import { requester } from "~/Functions/Utils/requester";

import { userRouteTemplate } from "~/Templates/routeTemplates/userRouteTemplate";

const { countries, baseRoute } = userRouteTemplate;

const getCountriesAPI = async (data = {}) => {
	try {
		const response = await requester({
			data,
			method: countries.properties.method,
			url: `${baseRoute.properties.route}${countries.properties.route}`,
		});
		return response;
	} catch (error) {
		console.log("getCountriesAPI catch", error);
	}
};
export { getCountriesAPI };

import { requester } from "~/Functions/Utils/requester";

import { cellphoneRouteTemplate } from "~/Templates/routeTemplate/cellphoneRouteTemplate";

const { baseRoute, getContacts } = cellphoneRouteTemplate;

const getContactsAPI = (data) => {
	try {
		const result = requester({
			data,
			method: getContacts.properties.method,
			url: `${baseRoute.properties.route}${getContacts.properties.route}`,
		});

		return result;
	} catch (error) {}
};

export { getContactsAPI };

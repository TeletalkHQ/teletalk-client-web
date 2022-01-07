import { requester } from "~/Functions/Utils/requester";

import { cellphoneRouteTemplate } from "~/Templates/routeTemplate/cellphoneRouteTemplate";

const { baseRoute, addContact } = cellphoneRouteTemplate;

const addNewContactAPI = (data) => {
	const response = requester({
		data,
		method: addContact.properties.method,
		url: `${baseRoute.properties.route}${addContact.properties.route}`,
	});

	return response;
};

export { addNewContactAPI };

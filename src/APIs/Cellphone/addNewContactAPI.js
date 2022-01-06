import { requester } from "~/Functions/Utils/requester";

import { cellphoneRouteTemplate } from "~/Templates/routeTemplate/cellphoneRouteTemplate";

const { baseRoute, addContact } = cellphoneRouteTemplate;

const addNewContactAPI = (data) => {
	const result = requester({
		data,
		method: addContact.properties.method,
		url: `${baseRoute.properties.route}${addContact.properties.route}`,
	});

	return result;
};

export { addNewContactAPI };

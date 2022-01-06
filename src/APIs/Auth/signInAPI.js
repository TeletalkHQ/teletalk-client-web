import { requester } from "~/Functions/Utils/requester";

import { userRouteTemplate } from "~/Templates/routeTemplate/userRouteTemplate";

const { baseRoute, signInNormal } = userRouteTemplate;

const signInAPI = (data) => {
	const response = requester({
		data,
		method: signInNormal.properties.method,
		url: `${baseRoute.properties.route}${signInNormal.properties.route}`,
	});

	return response;
};

export { signInAPI };

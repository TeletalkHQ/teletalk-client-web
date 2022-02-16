import { requester } from "~/Functions/Utils/requester";

import { userRouteTemplate } from "~/Templates/routeTemplates/userRouteTemplate";

const { baseRoute, statusCheck } = userRouteTemplate;

const userStatusCheckerAPI = () => {
	const response = requester({
		method: statusCheck.properties.method,
		url: `${baseRoute.properties.route}${statusCheck.properties.route}`,
	});

	return response;
};

export { userStatusCheckerAPI };

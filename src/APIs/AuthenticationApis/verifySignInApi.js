import { requester } from "~/Functions/Utils/requester";

import { userRouteTemplate } from "~/Templates/routeTemplates/userRouteTemplate";

const { baseRoute, verifySignInNormal } = userRouteTemplate;

const verifySignInAPI = ({ token, ...data }) => {
  const response = requester({
    data,
    method: verifySignInNormal.properties.method,
    url: `${baseRoute.properties.route}${verifySignInNormal.properties.route}`,
    token,
  });

  return response;
};

export { verifySignInAPI };

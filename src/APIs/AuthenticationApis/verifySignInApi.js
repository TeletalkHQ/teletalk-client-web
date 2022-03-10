import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { userRouterTemplate } = StuffStore.templates.routerTemplates;
const { baseRoute, verifySignInNormal } = userRouterTemplate;

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

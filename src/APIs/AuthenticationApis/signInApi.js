import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { userRouterTemplate } = StuffStore.templates.routerTemplates;
const { baseRoute, signInNormal } = userRouterTemplate;

const signInAPI = (data) => {
  const response = requester({
    data,
    method: signInNormal.properties.method,
    url: `${baseRoute.properties.route}${signInNormal.properties.route}`,
  });

  return response;
};

export { signInAPI };

import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { userRouterTemplate } = StuffStore.templates.routerTemplates;
const { baseRoute, statusCheck } = userRouterTemplate;

const userStatusCheckerAPI = () => {
  const response = requester({
    method: statusCheck.properties.method,
    url: `${baseRoute.properties.route}${statusCheck.properties.route}`,
  });

  return response;
};

export { userStatusCheckerAPI };

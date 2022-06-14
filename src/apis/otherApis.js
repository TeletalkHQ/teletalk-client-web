import { apiManager } from "classes/ApiManager";

const { otherRouteBaseUrl, welcomeRoute } = {};

const welcomeApi = apiManager
  .create()
  .setRequirements()
  .build(otherRouteBaseUrl, welcomeRoute);

export { welcomeApi };

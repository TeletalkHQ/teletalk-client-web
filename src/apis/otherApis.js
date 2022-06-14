import { apiManager } from "classes/ApiManager";
import { stuffStore } from "classes/StuffStore";

const { otherRouteBaseUrl, welcomeRoute } = stuffStore.routes;

const welcomeApi = apiManager
  .create()
  .setRequirements()
  .build(otherRouteBaseUrl, welcomeRoute);

export { welcomeApi };

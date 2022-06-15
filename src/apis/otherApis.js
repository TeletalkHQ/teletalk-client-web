import { apiManager } from "classes/ApiManager";
import { stuffStore } from "classes/StuffStore";

const { otherRouteBaseUrl, welcomeRoute, countriesRoute } = stuffStore.routes;

console.log("rm", "otherRouteBaseUrl", otherRouteBaseUrl);

const welcomeApi = apiManager
  .create()
  .setRequirements()
  .build(otherRouteBaseUrl, welcomeRoute);

const getCountriesApi = apiManager
  .create()
  .setRequirements(otherRouteBaseUrl, countriesRoute)
  .build();

export { welcomeApi, getCountriesApi };

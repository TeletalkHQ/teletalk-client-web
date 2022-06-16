import { apiBuilder } from "classes/ApiBuilder";
import { stuffStore } from "classes/StuffStore";

const { otherRouteBaseUrl, welcomeRoute, countriesRoute } = stuffStore.routes;

console.log("rm", "otherRouteBaseUrl", otherRouteBaseUrl);

const welcomeApi = apiBuilder
  .create()
  .setRequirements()
  .build(otherRouteBaseUrl, welcomeRoute);

const getCountriesApi = apiBuilder
  .create()
  .setRequirements(otherRouteBaseUrl, countriesRoute)
  .build();

export { welcomeApi, getCountriesApi };

import { apiBuilder } from "classes/ApiBuilder";
import { stuffStore } from "classes/StuffStore";

const { otherRouteBaseUrl, welcomeRoute, countriesRoute } = stuffStore.routes;

const welcomeApi = apiBuilder
  .create()
  .setRequirements(otherRouteBaseUrl, welcomeRoute)
  .build();

const getCountriesApi = apiBuilder
  .create()
  .setRequirements(otherRouteBaseUrl, countriesRoute)
  .build();

export { welcomeApi, getCountriesApi };

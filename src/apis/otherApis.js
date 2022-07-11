import { apiBuilder } from "classes/ApiBuilder";
import { stuffStore } from "classes/StuffStore";

const { welcomeRoute, countriesRoute } = stuffStore.routes;

const welcomeApi = apiBuilder.create().setRequirements(welcomeRoute).build();

const getCountriesApi = apiBuilder
  .create()
  .setRequirements(countriesRoute)
  .build();

export { welcomeApi, getCountriesApi };

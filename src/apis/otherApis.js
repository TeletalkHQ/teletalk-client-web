import { apiBuilder } from "classes/ApiBuilder";
import { stuffStore } from "classes/StuffStore";
import { randomMaker } from "classes/RandomMaker";

const { welcomeRoute, countriesRoute } = stuffStore.routes;

const welcomeApi = apiBuilder.create().setRequirements(welcomeRoute).build();

const getCountriesApi = apiBuilder
  .create()
  .setRequirements(countriesRoute)
  .responseInterceptors((responseData) => {
    responseData.countries.forEach((country) => {
      country.id = randomMaker.randomId();
    });
  })
  .build();

export { welcomeApi, getCountriesApi };

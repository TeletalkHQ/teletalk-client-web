import { apiBuilder } from "classes/Builders/ApiBuilder";
import { stuffStore } from "classes/StuffStore";
import { randomMaker } from "classes/RandomMaker";

const { countriesRoute, welcomeRoute } = stuffStore.routes;

const addUniqueIdToEachCountry = (responseData) => {
  return {
    countries: responseData.countries.map((country) => ({
      ...country,
      id: randomMaker.randomId(),
    })),
  };
};

const welcomeApi = apiBuilder.create().setRequirements(welcomeRoute).build();

const getCountriesApi = apiBuilder
  .create()
  .setRequirements(countriesRoute)
  .setResponseTransformer(addUniqueIdToEachCountry)
  .build();

export { getCountriesApi, welcomeApi };

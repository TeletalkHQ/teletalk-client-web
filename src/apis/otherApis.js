import { apiBuilder } from "classes/ApiBuilder";
import { stuffStore } from "classes/StuffStore";
import { randomMaker } from "classes/RandomMaker";

const { welcomeRoute, countriesRoute } = stuffStore.routes;

const welcomeApi = apiBuilder.create().setRequirements(welcomeRoute).build();

const getCountriesApi = apiBuilder
  .create()
  .setRequirements(countriesRoute)
  .responseTransformer((responseData) => {
    return {
      countries: responseData.countries.map((country) => ({
        ...country,
        id: randomMaker.randomId(),
      })),
    };
  })
  .build();

export { welcomeApi, getCountriesApi };

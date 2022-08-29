import { randomMaker } from "utility-store/src/classes/RandomMaker";

const addUniqueIdToEachCountry = (responseData) => {
  return {
    countries: responseData.countries.map((country) => ({
      ...country,
      id: randomMaker.randomId(),
    })),
  };
};

export { addUniqueIdToEachCountry };

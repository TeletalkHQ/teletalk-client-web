import { randomMaker } from "utility-store";

const addUniqueIdToEachCountry = (responseData) => {
  return {
    countries: responseData.countries.map((country) => ({
      ...country,
      id: randomMaker.id(),
    })),
  };
};

const transformers = { addUniqueIdToEachCountry };

export { transformers };

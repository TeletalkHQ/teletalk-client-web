import { randomMaker } from "utility-store";

import { Countries } from "~/types";

const addUniqueIdToEachCountry = (data: { countries: Countries }) => {
  return {
    countries: data.countries.map((country) => ({
      ...country,
      id: randomMaker.id(),
    })),
  };
};

const transformers = {
  addUniqueIdToEachCountry,
};

export { transformers };

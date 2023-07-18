import { randomMaker } from "utility-store";
import { Countries } from "utility-store/lib/types";

const addUniqueIdToEachCountry = (countries: Countries) => {
  return {
    countries: countries.map((country) => ({
      ...country,
      id: randomMaker.id(),
    })),
  };
};

export const transformers = {
  addUniqueIdToEachCountry,
};

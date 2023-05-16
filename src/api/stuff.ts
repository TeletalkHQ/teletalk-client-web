import { apiBuilder } from "src/classes/api/ApiBuilder";

const getAllStuffs = {
  description:
    "Use for get all routes, models, validation models, errors and more",
  fullUrl: "/stuff/getAllStuff",
  inputFields: {
    language: { type: "string" },
  },
  method: "post",
  outputFields: [{}],
  statusCode: 200,
  url: "/getAllStuff",
};

const getAllStuff = apiBuilder
  .create()
  .setRequirements({ route: getAllStuffs })
  .build();

const stuff = { getAllStuff };

export { stuff };

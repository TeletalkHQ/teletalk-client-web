import { apiBuilder } from "src/classes/api/ApiBuilder";

const getAllStuffs = {
  description:
    "Use for get all routes, models, validation models, errors and more",
  fullUrl: "/versionControl/getAllStuff",
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
  .setRequirements({ routeObject: getAllStuffs })
  .build();

const versionControl = { getAllStuff };

export { versionControl };

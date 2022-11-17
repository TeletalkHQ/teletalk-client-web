import { apiBuilder } from "classes/api/ApiBuilder";

const getAllStuffs = {
  description:
    "Use for get all routes, models, validation models, errors and more",
  fullUrl: "/versionControl/getAllStuff",
  inputFields: [
    {
      language: { type: "string" },
    },
  ],
  method: "post",
  outputFields: [{}],
  statusCode: 200,
  url: "/getAllStuff",
};

const getAllStuffApi = apiBuilder
  .create()
  .setRequirements({ routeObject: getAllStuffs })
  .build();

export { getAllStuffApi };

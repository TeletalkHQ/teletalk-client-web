import { apiBuilder } from "classes/apiClasses/ApiBuilder";

const { getAllStuffsRoute } = {
  getAllStuffsRoute: {
    description:
      "Use for get all routes, models, validation models, errors and more",
    fullUrl: "/versionControl/getAllStuff",
    inputFields: [{}],
    method: "get",
    optionalFields: [{}],
    outputFields: [{}],
    statusCode: 200,
    url: "/getAllStuff",
  },
};

const getAllStuffApi = apiBuilder
  .create()
  .setRequirements({ routeObject: getAllStuffsRoute })
  .build();

export { getAllStuffApi };

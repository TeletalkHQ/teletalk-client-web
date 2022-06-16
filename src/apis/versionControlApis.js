import { apiBuilder } from "classes/ApiBuilder";
import { stuffStore } from "classes/StuffStore";

const { getAllStuffsRoute, versionControlBaseUrl } = stuffStore.routes;

console.log(getAllStuffsRoute, versionControlBaseUrl);

const getAllStuffApi = apiBuilder
  .create()
  .setRequirements(versionControlBaseUrl, getAllStuffsRoute)
  .build();

export { getAllStuffApi };

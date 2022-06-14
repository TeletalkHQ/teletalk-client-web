import { apiManager } from "classes/ApiManager";
import { stuffStore } from "classes/StuffStore";

const { getAllStuffsRoute, versionControlBaseUrl } = stuffStore.routes;

console.log(getAllStuffsRoute, versionControlBaseUrl);

const getAllStuffApi = apiManager
  .create()
  .setRequirements(versionControlBaseUrl, getAllStuffsRoute)
  .build();

export { getAllStuffApi };

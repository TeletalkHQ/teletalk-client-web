import { apiManager } from "classes/ApiManager";

const { getAllStuffsRoute, versionControlBaseUrl } = {};

const getAllStuffApi = apiManager
  .create()
  .setRequirements(getAllStuffsRoute, versionControlBaseUrl)
  .build();

export { getAllStuffApi };

import { apiBuilder } from "classes/Builders/ApiBuilder";
import { stuffStore } from "classes/StuffStore";

const { getAllStuffsRoute } = stuffStore.routes;

const getAllStuffApi = apiBuilder
  .create()
  .setRequirements(getAllStuffsRoute)
  .build();

export { getAllStuffApi };

import { appConfigs } from "classes/AppConfigs";
import { windowUtilities } from "classes/WindowUtilities";

const updateWindowStateAndConfigs = (state) => {
  windowUtilities
    .addProperty("state", state)
    .addProperty("appConfigs", appConfigs);
};

export { updateWindowStateAndConfigs };

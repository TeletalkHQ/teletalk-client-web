import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { appConfigs } from "classes/AppConfigs";
import { systemController } from "classes/SystemController";

const updateWindowCustomProperties = (state) => {
  windowUtilities
    .addProperty("state", state)
    .addProperty("appConfigs", appConfigs)
    .addProperty("systemController", systemController);
};

export { updateWindowCustomProperties };

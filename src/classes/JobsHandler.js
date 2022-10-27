import { eventManager } from "utility-store/src/classes/EventManager";
import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { apiManager } from "classes/api/ApiManager";
import { appOptions } from "classes/AppOptions";
import { stuffStore } from "classes/StuffStore";
import { persistentStorage } from "classes/PersistentStorage";
import { systemController } from "classes/SystemController";
import { validatorManager } from "classes/ValidatorManager";

import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/helpers";

class JobsHandler {
  emitAllStuffReceived() {
    const {
      EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
    } = appOptions.getOptions();

    eventManager.emitEvent(ALL_STUFF_RECEIVED);
    systemController.changeEventStatusToDone(ALL_STUFF_RECEIVED);
  }

  thingsToDoAfterAllStuffReceived() {
    const { version, ...validationModels } = stuffStore.validationModels;

    apiManager.rebuildAllApis();
    windowUtilities.addProperty("apiManager", apiManager);

    validatorManager.compileValidators(validationModels);
    windowUtilities.addProperty("validatorManager", validatorManager);

    const stuffs = {
      errors: stuffStore.errors,
      languageData: stuffStore.languageData,
      models: stuffStore.models,
      routes: stuffStore.routes,
      validationModels: stuffStore.validationModels,
    };
    windowUtilities.addProperty("stuffs", stuffs);
    persistentStorage.setItem(PERSISTENT_STORAGE_KEYS.STUFFS, stuffs);
  }
}

const jobsHandler = new JobsHandler();

export { JobsHandler, jobsHandler };

//? One time jobs

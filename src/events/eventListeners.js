import { apiManager } from "classes/apiClasses/ApiManager";
import { stuffStore } from "classes/StuffStore";
import { validatorManager } from "classes/ValidatorManager";
import { windowUtilities } from "utility-store/src/classes/WindowUtilities";
const thingsToDoAfterAllStuffReceived = () => {
  const { version, ...validationModels } = stuffStore.validationModels;

  apiManager.rebuildAllApis();
  windowUtilities.addProperty("apiManager", apiManager);
  validatorManager.compileValidators(validationModels);
};

export { thingsToDoAfterAllStuffReceived };

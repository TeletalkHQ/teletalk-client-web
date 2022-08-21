import { apiManager } from "classes/apiClasses/ApiManager";
import { validatorManager } from "classes/ValidatorManager";
import { windowUtilities } from "classes/WindowUtilities";

const thingsToDoAfterAllStuffReceived = () => {
  apiManager.rebuildAllApis();
  windowUtilities.addProperty("apiManager", apiManager);
  validatorManager.compileValidators();
};

export { thingsToDoAfterAllStuffReceived };

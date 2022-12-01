import { trier } from "utility-store/src/classes/Trier";

import { versionControl } from "api/versionControl";

import { apiManager } from "classes/api/ApiManager";
import { stuffStore } from "classes/StuffStore";
import { validatorManager } from "classes/ValidatorManager";

import { utilities } from "utilities";

import { actions } from "store/actions";
import { stateStatics } from "store/stateStatics";
import { commonActions } from "store/commonActions";

const getAllStuff = () => {
  return async (dispatch) => {
    const tryToGetAllStuff = async () => {
      const { data } = await versionControl.getAllStuff.sendFullFeaturedRequest(
        {
          language: "en",
        }
      );
      return data;
    };
    const executeIfNoErrorOnTryToGetAllStuff = (data) => {
      updateStuffStore(data);

      apiManager.build();

      const { version, ...validationModels } = stuffStore.validationModels;
      validatorManager.compileValidators(validationModels);

      //TODO: Use with commonActions
      dispatch(
        actions.changeInitialSetupStatus({
          status: stateStatics.INITIAL_SETUP_STATUS.DONE,
        })
      );
      dispatch(commonActions.changeViewMode.fullPageLoading());
    };

    const updateStuffStore = (stuffs) => {
      stuffStore.updateStore(stuffs);
    };

    (await trier(getAllStuff.name).tryAsync(tryToGetAllStuff))
      .executeIfNoError(executeIfNoErrorOnTryToGetAllStuff)
      .catch(utilities.printCatchError, getAllStuff.name);
  };
};

const stuffControllers = { getAllStuff };

export { stuffControllers };

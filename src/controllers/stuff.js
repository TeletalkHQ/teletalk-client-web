import { trier } from "utility-store/src/classes/Trier";

import { versionControl } from "src/api/versionControl";

import { apiManager } from "src/classes/api/ApiManager";
import { stuffStore } from "src/classes/StuffStore";
import { validatorManager } from "src/classes/ValidatorManager";

import { utilities } from "src/utilities";

import { actions } from "src/store/actions";
import { stateStatics } from "src/store/stateStatics";
import { commonActions } from "src/store/commonActions";

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

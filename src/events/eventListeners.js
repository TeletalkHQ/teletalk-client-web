import { apiManager } from "classes/apiClasses/ApiManager";
import { validatorManager } from "classes/ValidatorManager";

import { getCountriesController } from "controllers/authControllers/getCountriesController";
import { userStatusCheckerController } from "controllers/authControllers/userStatusCheckerController";
import { getUserChatsLastMessageController } from "controllers/messageControllers/getUserChatsLastMessageController";
import { welcomeMessageController } from "controllers/otherControllers/welcomeMessageController";

import { extractedDispatchAsync } from "hooks/useThunkReducer";

const allStuffReceivedListener = async () => {
  apiManager.rebuildAllApis();
  validatorManager.compileValidators();

  await extractedDispatchAsync(getCountriesController());
  await extractedDispatchAsync(welcomeMessageController());
};

const updateUserStatusAndChatsListener = async (privateId) => {
  if (privateId) {
    const { user } = await extractedDispatchAsync(
      userStatusCheckerController()
    );

    await extractedDispatchAsync(getUserChatsLastMessageController({ user }));
  }
};

export { allStuffReceivedListener, updateUserStatusAndChatsListener };

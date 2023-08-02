import { domUtils } from "~/classes/DomUtils";
import { useAuthStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useVerify = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { handler } = useEmitter("verify");

  const updater = () => {
    authStore.updateAuthenticationProgress(true);

    handler.emitFull(
      {
        verificationCode: authStore.verificationCode,
      },
      ({ data }) => {
        authStore.updateVerificationCode("");
        authStore.updateAuthenticationProgress(false);

        if (data.newUser) router.replace("create");
        else router.push("initialSetup");
      },
      () => {
        authStore.updateAuthenticationProgress(false);
        domUtils()
          .setElementByName("verificationCode")
          .focusElement()
          .selectAllValue();
      }
    );
  };

  return {
    updater,
  };
};

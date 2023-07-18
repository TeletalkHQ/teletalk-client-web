import { domUtils } from "~/classes/DomUtils";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { useAuthStore } from "~/store";
import { VerifyIO } from "~/types";

import { useCustomRouter } from "./useCustomRouter";

export const useVerify = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();

  const updater = async () => {
    authStore.updateAuthenticationProgress(true);

    await socketEmitterStore.events.verify.emitFull<VerifyIO>(
      {
        verificationCode: authStore.verificationCode,
      },
      async ({ data }) => {
        authStore.updateVerificationCode("");
        authStore.updateAuthenticationProgress(false);

        if (data.newUser) router.replace("create");
        else router.push("initialSetup");

        return data;
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

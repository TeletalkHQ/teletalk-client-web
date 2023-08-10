import { domUtils } from "~/classes/DomUtils";
import { useAuthStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useVerify = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { handler, loading } = useEmitter("verify");

  const updater = () => {
    handler.emitFull(
      {
        verificationCode: authStore.verificationCode,
      },
      ({ data }) => {
        authStore.updateVerificationCode("");

        if (data.newUser) router.replace("create");
        else router.push("messenger");
      },
      () => {
        domUtils()
          .setElementByName("verificationCode")
          .focusElement()
          .selectAllValue();
      }
    );
  };

  return {
    loading,
    updater,
  };
};

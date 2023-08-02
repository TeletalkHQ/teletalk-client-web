import { extractor } from "~/classes/Extractor";
import { useAuthStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useSignIn = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { handler } = useEmitter("signIn");

  const updater = () => {
    authStore.updateAuthenticationProgress(true);

    handler.emitFull(
      extractor.cellphone(authStore),
      () => {
        authStore.updateAuthenticationProgress(false);
        router.push("verify");
      },
      (errors) => {
        console.error(errors);
        authStore.updateAuthenticationProgress(false);
      }
    );
  };

  return {
    updater,
  };
};

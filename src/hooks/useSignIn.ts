import { useAuthStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useSignIn = () => {
  const state = useAuthStore();
  const router = useCustomRouter();
  const { handler } = useEmitter("signIn");

  const updater = async () => {
    state.updateAuthenticationProgress(true);

    await handler.emitFull(
      {
        countryCode: state.countryCode,
        countryName: state.countryName,
        phoneNumber: state.phoneNumber,
      },
      async ({ data }) => {
        state.updateAuthenticationProgress(false);
        router.push("verify");
        return data;
      },
      (errors) => {
        console.error(errors);
        state.updateAuthenticationProgress(false);
      }
    );
  };

  return {
    updater,
  };
};

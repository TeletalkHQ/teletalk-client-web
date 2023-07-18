import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { useAuthStore } from "~/store";
import { SignInIO } from "~/types";

import { useCustomRouter } from "./useCustomRouter";

export const useSignIn = () => {
  const state = useAuthStore();
  const router = useCustomRouter();

  const updater = async () => {
    state.updateAuthenticationProgress(true);

    await socketEmitterStore.events.signIn.emitFull<SignInIO>(
      {
        countryCode: state.countryCode,
        countryName: state.countryName,
        phoneNumber: state.phoneNumber,
      },
      async ({ data }) => {
        state.updateAuthenticationProgress(false);
        router.push("verify");
        return data;
      }
    );
  };

  return {
    updater,
  };
};

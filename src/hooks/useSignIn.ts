import { extractor } from "~/classes/Extractor";
import { useAuthStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useSignIn = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { handler, loading } = useEmitter("signIn");

  const updater = () => {
    handler.emitFull(
      extractor.unknownCellphone(authStore),
      () => {
        router.push("verify");
      },
      (errors) => {
        console.error(errors);
      }
    );
  };

  return {
    loading,
    updater,
  };
};

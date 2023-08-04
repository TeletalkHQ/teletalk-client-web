import { extractor } from "~/classes/Extractor";
import { useAuthStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useCreate = () => {
  const authState = useAuthStore();
  const router = useCustomRouter();
  const { handler, loading } = useEmitter("createNewUser");

  const updater = async () => {
    handler.emitFull(extractor.fullName(authState), () => {
      authState.updateFirstName("");
      authState.updateLastName("");

      router.push("initialSetup");
    });
  };

  return {
    updater,
    loading,
  };
};

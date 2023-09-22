import { extractor } from "~/classes/Extractor";
import { useAuthStore } from "~/store";

import { useCustomRouter } from "./useCustomRouter";
import { useEmitter } from "./useEmitter";

export const useCreate = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { handler: createHandler, loading } = useEmitter("createNewUser");

  const handler = async () => {
    createHandler.emitFull(extractor.fullName(authStore), () => {
      authStore.updateFirstName("");
      authStore.updateLastName("");

      router.push("messenger");
    });
  };

  return {
    handler,
    loading,
  };
};

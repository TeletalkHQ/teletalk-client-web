import { useSettingsStore } from "~/store";
import { VoidNoArgsFn } from "~/types";

import { useEmitter } from "./useEmitter";

export const useUpdateProfile = () => {
  const settingsStore = useSettingsStore();
  const { handler, loading } = useEmitter("updatePublicUserData");

  const updater = (cb: VoidNoArgsFn) => {
    const { countryCode, countryName, phoneNumber, ...restProfile } =
      settingsStore.profile;

    handler.emitFull(restProfile, async ({ data }) => {
      cb();

      return data;
    });
  };

  return {
    loading,
    updater,
  };
};

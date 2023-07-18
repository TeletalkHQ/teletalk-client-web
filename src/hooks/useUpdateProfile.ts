import { extractor } from "~/classes/Extractor";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { useSettingsStore, useUserStore } from "~/store";
import { UpdatePublicUserDataIO, VoidNoArgsFn } from "~/types";

export const useUpdateProfile = () => {
  const userStore = useUserStore();
  const settingsStore = useSettingsStore();

  const updater = (cb: VoidNoArgsFn) => {
    const { countryCode, countryName, phoneNumber, ...restProfile } =
      settingsStore.profile;
    socketEmitterStore.events.updatePublicUserData.emitFull<UpdatePublicUserDataIO>(
      restProfile,
      async ({ data }) => {
        userStore.setUserData(
          extractor.userState({ ...userStore, ...data.publicUserData })
        );

        cb();

        return data;
      }
    );
  };

  return { updater };
};

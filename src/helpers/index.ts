import { userUtils } from "~/classes/UserUtils";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { SettingsState, UserStore, VoidNoArgsFn } from "~/types";

const updateProfile = (
  settingsState: SettingsState,
  userState: UserStore,
  cb: VoidNoArgsFn
) => {
  const { countryCode, countryName, phoneNumber, ...profile } =
    settingsState.profile;
  socketEmitterStore.events.updatePublicUserData.emitFull(
    profile,
    async ({ data }) => {
      userState.setUserData({
        ...userUtils.extractUserData(userState),
        ...data.publicUserData,
      });

      cb();
    }
  );
};

export const helpers = { updateProfile };

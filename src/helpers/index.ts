import { extractor } from "~/classes/Extractor";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import {
  SettingsState,
  UpdatePublicUserDataIO,
  UserStore,
  VoidNoArgsFn,
} from "~/types";

const updateProfile = (
  settingsState: SettingsState,
  userState: UserStore,
  cb: VoidNoArgsFn
) => {
  const { countryCode, countryName, phoneNumber, ...profile } =
    settingsState.profile;
  socketEmitterStore.events.updatePublicUserData.emitFull<UpdatePublicUserDataIO>(
    profile,
    async ({ data }) => {
      userState.setUserData({
        ...extractor.userState({ ...userState, ...data.publicUserData }),
        ...data.publicUserData,
        status: userState.status,
        createdAt: userState.createdAt,
      });

      cb();

      return data;
    }
  );
};

export const helpers = { updateProfile };

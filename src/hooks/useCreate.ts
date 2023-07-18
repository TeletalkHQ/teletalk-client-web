import { extractor } from "~/classes/Extractor";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { useAuthStore } from "~/store";
import { CreateNewUserIO } from "~/types";

import { useCustomRouter } from "./useCustomRouter";

export const useCreate = () => {
  const authState = useAuthStore();
  const router = useCustomRouter();

  const updater = async () => {
    socketEmitterStore.events.createNewUser.emitFull<CreateNewUserIO>(
      extractor.fullName(authState),
      async ({ data }) => {
        authState.updateFirstName("");
        authState.updateLastName("");

        router.push("initialSetup");

        return data;
      }
    );
  };

  return { updater };
};

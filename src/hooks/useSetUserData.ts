import { extractor } from "~/classes/Extractor";
import { maker } from "~/classes/Maker";
import { useUserStore } from "~/store";
import {
  GetUserDataIO,
  SocketErrorCallback,
  SocketResponseCallback,
} from "~/types";

import { useEmitter } from "./useEmitter";

export const useSetUserData = ({
  errorCb,
  successCb,
}: {
  successCb?: SocketResponseCallback<GetUserDataIO["output"]>;
  errorCb?: SocketErrorCallback;
} = {}) => {
  const { handler, loading } = useEmitter("getUserData");
  const userStore = useUserStore();

  const updater = () => {
    return handler.emitFull(
      {},
      (response) => {
        userStore.setCurrentUserData(
          extractor.currentUserData(response.data.user)
        );
        userStore.setUsers(
          response.data.user.contacts.map((item) => ({
            ...maker.emptyUser(),
            ...item,
            isContact: true,
            isBlocked: response.data.user.blacklist.some(
              (i) => i.userId === item.userId
            ),
          }))
        );

        successCb?.(response);
      },
      errorCb
    );
  };

  return {
    loading,
    updater,
  };
};

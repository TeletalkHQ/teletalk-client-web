import type { GetUserDataIO } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { maker } from "~/classes/Maker";
import { useUserStore } from "~/store";
import { SocketErrorCallback, SocketResponseCallback, UserItem } from "~/types";

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

        const users: UserItem[] = response.data.user.contacts.map((item) => ({
          ...maker.emptyUser(),
          ...item,
          isContact: true,
          isBlocked: response.data.user.blacklist.some(
            (i) => i.userId === item.userId
          ),
        }));

        const usersThatExistOnlyInTheBlacklist: UserItem[] =
          response.data.user.blacklist
            .filter((i) => !users.some((j) => i.userId === j.userId))
            .map((item) => ({
              ...maker.emptyUser(),
              ...item,
              isBlocked: true,
            }));

        users.push(...usersThatExistOnlyInTheBlacklist);

        userStore.setUsers(users);

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

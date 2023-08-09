import { useEffect } from "react";

import { extractor } from "~/classes/Extractor";
import { maker } from "~/classes/Maker";
import { useCustomRouter, useEmitter } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

const Auth = () => {
  const userStore = useUserStore();
  const globalStore = useGlobalStore();
  const router = useCustomRouter();
  const { handler } = useEmitter("getUserData");

  useEffect(() => {
    globalStore.openFullPageLoading();

    handleUpdateUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUserData = () => {
    handler.emitFull(
      {},
      ({ data }) => {
        userStore.setUserData(extractor.userState(data.user));
        globalStore.setUsers(
          data.user.contacts.map((item) => ({
            ...maker.emptyUser(),
            ...item,
            isContact: true,
            isBlocked: data.user.blacklist.some(
              (i) => i.userId === item.userId
            ),
          }))
        );
        router.push("messenger");
        globalStore.closeFullPageLoading();
      },
      () => {
        globalStore.closeFullPageLoading();
      }
    );
  };

  return <></>;
};

export default Auth;

import { useEffect } from "react";

import { useCustomRouter } from "~/hooks/useCustomRouter";
import { useEmitter } from "~/hooks/useEmitter";
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
        userStore.setUserData(data.user);
        router.push("messenger");
        globalStore.closeFullPageLoading();
      },
      (errors) => {
        if (errors.some((i) => i.isAuthError)) {
          router.push("signIn");
        }
        globalStore.closeFullPageLoading();
      },
      {
        timeout: 2000,
      }
    );
  };

  return <></>;
};

export default Auth;

import { useEffect } from "react";

import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { useCustomRouter } from "~/hooks/useCustomRouter";
import { useGlobalStore, useUserStore } from "~/store";
import { GetUserDataIO } from "~/types";

const Auth = () => {
  const userStore = useUserStore();
  const globalStore = useGlobalStore();
  const router = useCustomRouter();

  useEffect(() => {
    globalStore.openFullPageLoading();

    handleUpdateUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUserData = async () => {
    await socketEmitterStore.events.getUserData.emitFull<GetUserDataIO>(
      {},
      async ({ data }) => {
        userStore.setUserData(data.user);
        router.push("messenger");
        return data;
      },
      (errors) => {
        if (errors.some((i) => i.isAuthError)) router.push("signIn");
      },
      {
        timeout: 2000,
      }
    );

    globalStore.closeFullPageLoading();
  };

  return <></>;
};

export default Auth;

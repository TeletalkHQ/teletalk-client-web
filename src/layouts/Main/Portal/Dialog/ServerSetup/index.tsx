import { useEffect, useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import { Template } from "~/components";
import { events } from "~/events";
import { usePing, useStore } from "~/hooks";
import { useDialogState } from "~/hooks/useDialogState";
import { useSetUserData } from "~/hooks/useSetUserData";
import { Url } from "~/types";
import { utils } from "~/utils";

import ServerSetupActions from "./Actions";
import ServerSetupContent from "./Content/Content";

const ServerSetup = () => {
  const stores = useStore();
  const dialogState = useDialogState("serverSetup");
  const [selectedServer, setSelectedServer] = useState<Url>(
    appConfigs.getConfigs().api.selectedServerUrl
  );
  const { loading, pinger, status } = usePing();
  const { updater: setUserData, loading: authLoading } = useSetUserData({
    successCb: () => {
      stores.global.closeDialog();
    },
  });

  useEffect(() => {
    stores.global.openDialog("serverSetup");
    const fn = async () => {
      const status = await handleSetup();
      if (status === "online") handleAuthenticateClick();
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServer]);

  const handleSetup = async () => {
    const { status } = await pinger(selectedServer);
    if (status === "online") {
      utils.registerWindowCustomProperties();
      appConfigs.updateSelectedServer(selectedServer);
      events.websocket.otherEvents();
    }

    return status;
  };

  const handleServersClick = () => {
    stores.global.openDialog("servers");
  };

  const handleServerSelectChange = (url: Url) => {
    setSelectedServer(url);
    handleSetup();
  };

  const handleAddServerClick = () => {
    stores.global.openDialog("addServer");
  };

  const handleAuthenticateClick = () => {
    stores.auth.reset();
    stores.message.reset();
    stores.settings.reset();
    stores.user.reset();

    websocket.setAndInitialize({
      url: selectedServer,
    });
    websocket.client.connect();

    setUserData();
  };

  const isPending = status === "pending";
  const isOffline = status === "offline";
  const isGloballyDisabled = isPending || authLoading;
  const isAuthDisabled = isPending || isOffline || authLoading;

  return (
    <>
      <Template.Dialog
        actions={
          <ServerSetupActions
            isAuthDisabled={isAuthDisabled}
            loading={authLoading}
            onAuthenticateClick={handleAuthenticateClick}
          />
        }
        content={
          <ServerSetupContent
            disabled={isGloballyDisabled}
            loading={loading}
            onAddServerClick={handleAddServerClick}
            onServerSelectChange={handleServerSelectChange}
            onServersClick={handleServersClick}
            onSetup={handleSetup}
            selectedServer={selectedServer}
            status={status}
          />
        }
        open={dialogState.open}
        isClosable={false}
      />
    </>
  );
};

export default ServerSetup;

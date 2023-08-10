import { useEffect, useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { extractor } from "~/classes/Extractor";
import { maker } from "~/classes/Maker";
import { websocket } from "~/classes/websocket/Websocket";
import DialogTemplate from "~/components/messenger/dialog/template";
import { events } from "~/events";
import { useCustomRouter, useEmitter, usePing } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";
import { Url } from "~/types";
import { utils } from "~/utils";

import InitialSetupActions from "./Actions";
import InitialSetupContent from "./Content";

const InitialSetup = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const [selectedServer, setSelectedServer] = useState<Url>(
    appConfigs.getConfigs().api.selectedServerUrl
  );
  const router = useCustomRouter();
  const { loading, pinger, status } = usePing();
  const { handler } = useEmitter("getUserData");

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
        globalStore.closeFullPageLoading();
      },
      () => {
        globalStore.closeFullPageLoading();
      }
    );
  };

  useEffect(() => {
    globalStore.openDialog("initialSetup");
    handleSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetup = async () => {
    const { status } = await pinger(selectedServer);
    if (status === "online") {
      utils.registerWindowCustomProperties();
      appConfigs.updateSelectedServer(selectedServer);
      events.websocket.otherEvents();
    }
  };

  const handleServersClick = () => {
    globalStore.openDialog("servers");
  };

  const handleServerSelectChange = (url: Url) => {
    setSelectedServer(url);
  };

  const handleAddServerClick = () => {
    globalStore.openDialog("addServer");
  };

  const handleAuthenticateClick = () => {
    websocket.client.connect();
    router.push("messenger");
  };

  const handleClose = () => {
    globalStore.closeDialog("initialSetup");
  };

  return (
    <>
      <DialogTemplate
        actions={<InitialSetupActions />}
        content={
          <InitialSetupContent
            loading={loading}
            onAddServerClick={handleAddServerClick}
            onAuthenticateClick={handleAuthenticateClick}
            onServerSelectChange={handleServerSelectChange}
            onServersClick={handleServersClick}
            onSetup={handleSetup}
            selectedServer={selectedServer}
            status={status}
          />
        }
        onClose={handleClose}
        open={globalStore.dialogState.initialSetup.open}
      />
    </>
  );
};

export default InitialSetup;

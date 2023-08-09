import { useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import { Input } from "~/components";
import Box from "~/components/general/box";
import AddServerButton from "~/components/initialSetup/AddServerButton";
import ServerStatus from "~/components/initialSetup/ServerStatus";
import ServerSelect from "~/components/initialSetup/ServersSelect";
import SetupButton from "~/components/initialSetup/SetupButton";
import { events } from "~/events";
import { useCustomRouter, usePing } from "~/hooks";
import { useGlobalStore } from "~/store";
import { Url } from "~/types";
import { utils } from "~/utils";

import Portal from "./portal";

const InitialSetup = () => {
  const globalStore = useGlobalStore();
  const [selectedServer, setSelectedServer] = useState<Url>(
    appConfigs.getConfigs().api.selectedServerUrl
  );
  const router = useCustomRouter();
  const { loading, pinger, status } = usePing();

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
    router.push("auth");
  };

  return (
    <>
      <Box.Div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
          padding: "10px",
          width: "100%",
        }}
      >
        <Box.Div
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <ServerStatus
            onClick={handleSetup}
            loading={loading}
            status={status}
          />

          <Input.PrimaryButton onClick={handleServersClick}>
            Servers
          </Input.PrimaryButton>

          <ServerSelect
            onServerSelectChange={handleServerSelectChange}
            selectedServer={selectedServer}
          />

          <AddServerButton onAddServerClick={handleAddServerClick} />

          <SetupButton
            indicatorText={status === "online" ? "Forwarding..." : "Trying..."}
            loading={loading}
            onSetup={handleSetup}
          />

          <Input.PrimaryButton
            onClick={handleAuthenticateClick}
            disabled={status !== "online"}
          >
            Authenticate
          </Input.PrimaryButton>
        </Box.Div>
      </Box.Div>

      <Portal />
    </>
  );
};

export default InitialSetup;

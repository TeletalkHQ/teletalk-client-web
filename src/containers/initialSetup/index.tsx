"use client";

import { useEffect, useState } from "react";
import { trier } from "simple-trier";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import AddServerButton from "~/components/initialSetup/AddServerButton";
import ServerSelect from "~/components/initialSetup/ServerSelect";
import ServerStatus from "~/components/initialSetup/ServerStatus";
import SetupButton from "~/components/initialSetup/SetupButton";
import { events } from "~/events";
import { useCustomRouter } from "~/hooks/useCustomRouter";
import { useGlobalStore } from "~/store";
import { Status } from "~/types";
import { utils } from "~/utils";

import Portal from "./portal";

const InitialSetup = () => {
  const globalStore = useGlobalStore();
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const router = useCustomRouter();

  useEffect(() => {
    if (!selectedServer)
      setSelectedServer(appConfigs.getConfigs().api.selectedServerUrl);
    else handleSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServer]);

  const handleSetup = () => {
    trier(handleSetup.name)
      .async()
      .try(async () => {
        setLoading(true);
        setStatus("pending");
        await handleSetClientId(selectedServer);
        utils.setWebsocketClient(selectedServer);
        websocket.client.on("connect", async () => {
          utils.registerWindowCustomProperties();
          appConfigs.updateSelectedServer(selectedServer);
          events.websocket.otherEvents();
          setStatus("online");
          setLoading(false);
        });

        websocket.client.on("connect_error", () => {
          websocket.client.disconnect();
          setStatus("offline");
          setLoading(false);
        });

        websocket.client.connect();
      })
      .catch(() => {
        websocket.client?.disconnect();
        setLoading(false);
        setStatus("offline");
      })
      .run();
  };

  const handleSetClientId = (url: string) => {
    return fetch(`${url}/setClientId`, {
      method: "GET",
      credentials: "include",
    });
  };

  const handleServersClick = () => {
    globalStore.openDialog("servers");
  };

  const handleServerSelectChange = (url: string) => {
    setSelectedServer(url);
    setStatus("idle");
  };

  const handleAddServerClick = () => {
    globalStore.openDialog("addServer");
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
          }}
        >
          <ServerStatus status={status} />

          <div style={{ marginTop: "10px" }}></div>

          <Input.Button onClick={handleServersClick}>Servers</Input.Button>

          <div style={{ marginTop: "10px" }}></div>

          <ServerSelect
            onServerSelectChange={handleServerSelectChange}
            selectedServer={selectedServer}
          />

          <div style={{ marginTop: "10px" }}></div>

          <AddServerButton onAddServerClick={handleAddServerClick} />

          <div style={{ marginTop: "10px" }}></div>

          <SetupButton
            indicatorText={status === "online" ? "Forwarding..." : "Trying..."}
            loading={loading}
            onSetup={handleSetup}
          />

          <div style={{ marginTop: "10px" }}></div>

          <Input.Button
            onClick={() => router.push("auth")}
            disabled={status !== "online"}
          >
            Authenticate
          </Input.Button>
        </Box.Div>
      </Box.Div>

      <Portal />
    </>
  );
};

export default InitialSetup;

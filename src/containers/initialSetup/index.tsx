import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trier } from "simple-trier";

import { appConfigs } from "~/classes/AppConfigs";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import ServerSelect from "~/components/initialSetup/ServerSelect";
import ServerStatus from "~/components/initialSetup/ServerStatus";
import SetupButton from "~/components/initialSetup/SetupButton";
import { events } from "~/events";
import { useGlobalStore, useUserStore } from "~/store";
import { GetUserDataIO, Status } from "~/types";
import { utils } from "~/utils";

import Portal from "./portal";

const InitialSetup = () => {
  const userStore = useUserStore();
  const globalStore = useGlobalStore();
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState(
    appConfigs.getConfigs().api.selectedServerUrl
  );
  const [status, setStatus] = useState<Status>("idle");
  const router = useRouter();

  useEffect(() => {
    handleSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetup = () => {
    trier(handleSetup.name)
      .async()
      .try(async () => {
        setLoading(true);
        setStatus("pending");
        await handleSetClientId();
        utils.setWebsocketClient(selectedServer);
        websocket.client.on("connect", async () => {
          socketEmitterStore.build();
          utils.registerWindowCustomProperties();
          events.websocket.otherEvents();
          await handleUpdateUserData();
          console.log("setup successful");
          setStatus("online");
          router.push("/messenger");
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
      })
      .run();
  };

  const handleSetClientId = () => {
    return fetch("http://localhost:8090/setClientId", {
      method: "GET",
      credentials: "include",
    });
  };

  const handleUpdateUserData = () => {
    return socketEmitterStore.events.getUserData.emitFull<GetUserDataIO>(
      {},
      async ({ data }) => {
        userStore.setUserData(data.user);

        return data;
      },
      (errors) => {
        if (errors.some((i) => i.isAuthError)) router.push("/signIn");
      },
      {
        timeout: 2000,
      }
    );
  };

  const handleServersClick = () => {
    globalStore.openDialog("servers");
  };

  const handleServerSelectChange = (url: string) => {
    setSelectedServer(url);
    setStatus("idle");
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

          <SetupButton
            indicatorText={status === "online" ? "Forwarding..." : "Trying..."}
            loading={loading}
            onSetup={handleSetup}
          />
        </Box.Div>
      </Box.Div>

      <Portal />
    </>
  );
};

export default InitialSetup;

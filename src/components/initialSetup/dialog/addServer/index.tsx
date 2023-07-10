import React, { useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { notificationManager } from "~/classes/NotificationManager";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useGlobalStore } from "~/store";
import { CommonChangeEvent, Status } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const AddServer = () => {
  const globalStore = useGlobalStore();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const handleClose = () => {
    globalStore.closeDialog("addServer");
  };

  const handlePingServer = async () => {
    setLoading(true);
    setStatus("pending");
    utils.setWebsocketClient(fixServerUrl());
    socketEmitterStore.build();
    websocket.client.on("connect", () => {
      websocket.client.disconnect();
      setStatus("online");
      setLoading(false);
    });
    websocket.client.on("connect_error", () => {
      setStatus("offline");
      websocket.client.disconnect();
      setLoading(false);
    });
    websocket.client.connect();
    await socketEmitterStore.events.ping.emitFull(
      {},
      undefined,
      () => {
        setStatus("offline");
        websocket.client.disconnect();
      },
      {
        client: websocket.client,
        timeout: 3000,
      }
    );
  };

  const handleInputChange = (event: CommonChangeEvent) => {
    setInputValue(event.target.value);
    setStatus("idle");
  };

  const handleAddClick = () => {
    if (
      appConfigs.getConfigs().api.servers.some((i) => i.url === fixServerUrl())
    )
      notificationManager.submitErrorNotification({
        description: "",
        isAuthError: false,
        message: "MESSAGE: SERVER_ALREADY_EXIST",
        reason: "SERVER_ALREADY_EXIST",
        side: "client",
      });
    else {
      appConfigs.addServerUrl(fixServerUrl());
      handleReset();
    }
  };

  const fixServerUrl = () => {
    return `https://${inputValue}`;
  };

  const handleReset = () => {
    globalStore.closeDialog("addServer");
    setInputValue("");
    setStatus("idle");
  };

  return (
    <DialogTemplate
      actions={
        <Actions disabled={status !== "online"} onAddClick={handleAddClick} />
      }
      content={
        <Content
          disabled={status === "pending"}
          status={status}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          loading={loading}
          onTestClick={handlePingServer}
        />
      }
      title={<Title />}
      onClose={handleClose}
      open={globalStore.dialogState.addServer.open}
    />
  );
};

export default AddServer;

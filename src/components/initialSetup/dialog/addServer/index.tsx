import React, { useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { notificationManager } from "~/classes/NotificationManager";
import DialogTemplate from "~/components/messenger/dialog/template";
import { usePing } from "~/hooks";
import { useGlobalStore } from "~/store";
import {
  CommonChangeEvent,
  CommonSelectChangeEvent,
  Protocol,
  Url,
} from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const AddServer = () => {
  const globalStore = useGlobalStore();
  const [inputValue, setInputValue] = useState("");
  const [protocol, setProtocol] = useState<Protocol>("https");
  const { loading, pinger, setStatus, status } = usePing();

  const handleClose = () => {
    globalStore.closeDialog("addServer");
  };

  const handleInputChange = (event: CommonChangeEvent) => {
    setInputValue(event.target.value);
    setStatus("idle");
  };

  const handleAddClick = () => {
    if (
      appConfigs.getConfigs().api.servers.some((i) => i.url === fixServerUrl())
    )
      notificationManager.printError("SERVER_ALREADY_EXIST");
    else {
      appConfigs.addServerUrl(fixServerUrl());
      handleReset();
    }
  };

  const fixServerUrl = (): Url => {
    return `${protocol}://${inputValue}`;
  };

  const handleReset = () => {
    globalStore.closeDialog("addServer");
    setInputValue("");
    setStatus("idle");
  };

  const handleSelectChange = (e: CommonSelectChangeEvent) => {
    setProtocol(e.target.value as Protocol);
  };

  const handleTestClick = () => {
    pinger(fixServerUrl());
  };

  return (
    <DialogTemplate
      actions={
        <Actions disabled={status !== "online"} onAddClick={handleAddClick} />
      }
      content={
        <Content
          disabled={status === "pending"}
          inputValue={inputValue}
          loading={loading}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onTestClick={handleTestClick}
          protocol={protocol}
          status={status}
        />
      }
      title={<Title />}
      onClose={handleClose}
      open={globalStore.dialogState.addServer.open}
    />
  );
};

export default AddServer;

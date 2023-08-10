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
    globalStore.openDialog("serverSetup");
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
    handleClose();
    setInputValue("");
    setStatus("idle");
  };

  const handleSelectChange = (e: CommonSelectChangeEvent) => {
    setProtocol(e.target.value as Protocol);
  };

  const handleTestClick = () => {
    pinger(fixServerUrl());
  };

  const isPending = status === "pending";
  const isAddDisabled = isPending || !inputValue || status !== "online";
  const isTestDisabled = isPending || !inputValue;
  const isCloseDisabled = isPending;
  const isInputsDisabled = isPending;

  return (
    <DialogTemplate
      title={<Title />}
      actions={
        <Actions
          isAddDisabled={isAddDisabled}
          isCloseDisabled={isCloseDisabled}
          isTestDisabled={isTestDisabled}
          loading={loading}
          onAddClick={handleAddClick}
          onClose={handleClose}
          onTestClick={handleTestClick}
        />
      }
      content={
        <Content
          disabled={isInputsDisabled}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          protocol={protocol}
          status={status}
        />
      }
      onClose={handleClose}
      open={globalStore.dialogState.addServer.open}
    />
  );
};

export default AddServer;

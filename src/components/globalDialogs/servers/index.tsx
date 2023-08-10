import React, { useEffect, useRef, useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useLoading, usePing } from "~/hooks";
import { useGlobalStore } from "~/store";
import { ServerTestResult, Url } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const Servers = () => {
  const globalStore = useGlobalStore();
  const list = useRef<ServerTestResult[]>([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const { loading, startLoading, finishLoading } = useLoading();
  const { pinger } = usePing();

  useEffect(() => {
    handleForceUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (globalStore.dialogState.servers.open) handleResetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalStore.dialogState.servers.open]);

  const handleResetList = () => {
    list.current = appConfigs.getConfigs().api.servers.map((item) => ({
      ping: -1,
      status: "idle",
      url: item.url,
    }));
    handleForceUpdate();
  };

  const handleForceUpdate = () => {
    setForceUpdate(!forceUpdate);
  };

  const handleClose = () => {
    globalStore.closeDialog("servers");
    globalStore.openDialog("serverSetup");
  };

  const handlePingAllServers = async () => {
    startLoading();

    handleResetList();

    for (const item of list.current) {
      await handlePingOneServer(item.url);
    }

    finishLoading();
  };

  const handleServerItemClick = async (url: Url) => {
    startLoading();
    await handlePingOneServer(url);
    finishLoading();
  };

  const handlePingOneServer = async (url: Url) => {
    updateServer(url, { status: "pending" });
    const result = await pinger(url);
    updateServer(url, result);
  };

  const updateServer = (
    url: Url,
    restResult: Partial<Omit<ServerTestResult, "url">> = {}
  ) => {
    const index = list.current.findIndex((i) => i.url === url);

    list.current[index] = { ...list.current[index], ...restResult };
  };

  const isPinging = list.current.some((item) => item.status === "pending");

  return (
    <DialogTemplate
      actions={
        <Actions loading={isPinging} onPingAllClick={handlePingAllServers} />
      }
      content={
        <Content
          disabled={isPinging}
          onListItemClick={handleServerItemClick}
          list={list.current}
        />
      }
      title={<Title />}
      onClose={handleClose}
      open={globalStore.dialogState.servers.open}
    />
  );
};

export default Servers;

import React, { useEffect, useRef, useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { Template } from "~/components";
import { useDialogState, useLoading, usePing } from "~/hooks";
import { ServerTestResult, Url } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const Servers = () => {
  const dialogState = useDialogState("servers");
  const list = useRef<ServerTestResult[]>([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const { loading, startLoading, finishLoading } = useLoading();
  const { pinger } = usePing();

  useEffect(() => {
    handleForceUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (dialogState.open) handleResetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogState.open]);

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
    <Template.Dialog
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
      open={dialogState.open}
    />
  );
};

export default Servers;

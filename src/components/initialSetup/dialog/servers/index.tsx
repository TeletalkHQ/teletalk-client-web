import React, { useEffect, useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import DialogTemplate from "~/components/messenger/dialog/template";
import { usePing } from "~/hooks/usePing";
import { useGlobalStore } from "~/store";
import { ServerTestResult, Url } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const Servers = () => {
  const globalStore = useGlobalStore();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ServerTestResult[]>([]);
  const { pinger } = usePing();

  useEffect(() => {
    if (globalStore.dialogState.servers.open) handleResetList();
  }, [globalStore.dialogState.servers.open]);

  const handleResetList = () => {
    setList(
      appConfigs.getConfigs().api.servers.map((item) => ({
        ping: -1,
        status: "idle",
        url: item.url,
      }))
    );
  };

  const handleClose = () => {
    globalStore.closeDialog("servers");
  };

  const handlePingAllServers = async () => {
    setLoading(true);

    for (const item of list) {
      await handlePingOneServer(item.url);
    }

    setLoading(false);
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
    const index = list.findIndex((i) => i.url === url);

    const copyList = [...list];

    copyList.splice(index, 1, { ...list[index], ...restResult });

    setList(copyList);
  };

  const isPinging = list.some((item) => item.status === "pending") || loading;

  return (
    <DialogTemplate
      actions={
        <Actions loading={isPinging} onPingAllClick={handlePingAllServers} />
      }
      content={
        <Content
          disabled={isPinging}
          onListItemClick={handlePingOneServer}
          list={list}
        />
      }
      title={<Title />}
      onClose={handleClose}
      open={globalStore.dialogState.servers.open}
    />
  );
};

export default Servers;

import React, { useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useGlobalStore } from "~/store";
import { Status } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";
import { ServerListItem } from "./types";

const Servers = () => {
  const globalStore = useGlobalStore();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ServerListItem[]>([
    {
      url: appConfigs.getConfigs().api.selectedServerUrl,
      ping: 20,
      status: "idle",
    },
  ]);

  const handleClose = () => {
    globalStore.closeDialog("servers");
  };

  const handlePingAllClick = async () => {
    setLoading(true);

    for (const item of list) {
      await handlePingSelectedUrl(item.url);
    }

    setLoading(false);
  };

  const handlePingSelectedUrl = async (url: string) => {
    setLoading(true);
    utils.setWebsocketClient(url);
    socketEmitterStore.build();
    websocket.client.on("connect", () => {
      websocket.client.disconnect();
      setLoading(false);
      updateServer(url, Date.now() - startDate, "online");
    });
    websocket.client.on("connect_error", () => {
      websocket.client.disconnect();
      setLoading(false);
      updateServer(url, -1, "offline");
    });
    websocket.client.connect();
    const startDate = Date.now();
    await socketEmitterStore.events.ping.emitFull({}, undefined, undefined, {
      client: websocket.client,
      timeout: 3000,
    });
  };

  const updateServer = (url: string, ping: number, status: Status) => {
    const index = list.findIndex((i) => i.url === url);

    const copyList = [...list];

    copyList.splice(index, 1, { ...list[index], ping, status });

    setList(copyList);
  };

  return (
    <DialogTemplate
      actions={
        <Actions loading={loading} onPingAllClick={handlePingAllClick} />
      }
      content={<Content onListItemClick={handlePingSelectedUrl} list={list} />}
      title={<Title />}
      onClose={handleClose}
      open={globalStore.dialogState.servers.open}
    />
  );
};

export default Servers;

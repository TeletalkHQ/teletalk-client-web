import React, { useEffect, useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useGlobalStore } from "~/store";
import { Url } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";
import { ServerListItem } from "./types";

const Servers = () => {
  const globalStore = useGlobalStore();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ServerListItem[]>([]);

  useEffect(() => {
    setList(
      appConfigs.getConfigs().api.servers.map((item) => ({
        ping: -1,
        status: "idle",
        url: item.url,
      }))
    );
  }, [globalStore.dialogState.servers.open]);

  const handleClose = () => {
    globalStore.closeDialog("servers");
  };

  const handlePingAllServers = async () => {
    setLoading(true);

    const newList: ServerListItem[] = [];

    for (const item of list) {
      const result = await handlePingSelectedUrl(item.url);
      newList.push(result);
    }

    setList(newList);

    setLoading(false);
  };

  const handlePingSelectedUrl = async (url: Url) => {
    return new Promise<ServerListItem>((resolve, reject) => {
      utils.setWebsocketClient(url);
      websocket.client.on("connect", () => {
        websocket.client.disconnect();
        resolve({
          ping: Date.now() - startDate,
          status: "online",
          url,
        });
      });
      websocket.client.on("connect_error", () => {
        websocket.client.disconnect();
        reject({
          ping: -1,
          status: "offline",
          url,
        });
      });
      websocket.client.connect();
      const startDate = Date.now();
      // socketEmitterStore.events.ping.emitFull({}, undefined, undefined, {
      //   client: websocket.client,
      //   timeout: 3000,
      // });
    });
  };

  const handlePingOneServer = async (url: Url) => {
    const result = await handlePingSelectedUrl(url);
    updateServer(result);
  };

  const updateServer = ({ ping, status, url }: ServerListItem) => {
    const index = list.findIndex((i) => i.url === url);

    const copyList = [...list];

    copyList.splice(index, 1, { ...list[index], ping, status });

    setList(copyList);
  };

  return (
    <DialogTemplate
      actions={
        <Actions loading={loading} onPingAllClick={handlePingAllServers} />
      }
      content={<Content onListItemClick={handlePingOneServer} list={list} />}
      title={<Title />}
      onClose={handleClose}
      open={globalStore.dialogState.servers.open}
    />
  );
};

export default Servers;

import { EmotionCache } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { trier } from "simple-trier";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import { events } from "~/events";
import Layout from "~/layout";
import MUIThemeProvider from "~/providers/MUIThemeProvider";
import ReactQueryProvider from "~/providers/ReactQueryProvider";
import {
  useGlobalStore,
  useMessageStore,
  useSettingsStore,
  useUserStore,
} from "~/store";
import createEmotionCache from "~/styles/createEmotionCache";
import { utils } from "~/utils";

export interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function _app(props: CustomAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const state = {
    message: useMessageStore(),
    user: useUserStore(),
    global: useGlobalStore(),
    settings: useSettingsStore(),
  };

  useEffect(() => {
    //@ts-ignore
    window.state = state;
  });

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setup = () => {
    trier(setup.name)
      .async()
      .try(async () => {
        await handleSetClientId();
      })
      .executeIfNoError(() => {
        websocket.client.connect();
        utils.registerWindowCustomProperties();
        events.websocket.otherEvents();
      })
      .run();
  };

  const handleSetClientId = () => {
    return fetch("http://localhost:8090/setClientId", {
      method: "GET",
      credentials: "include",
    });
  };

  return (
    <SnackbarProvider maxSnack={appConfigs.getConfigs().ui.maxNotification}>
      <ReactQueryProvider>
        <MUIThemeProvider emotionCache={emotionCache}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MUIThemeProvider>
        <ReactQueryDevtools />
      </ReactQueryProvider>
    </SnackbarProvider>
  );
}

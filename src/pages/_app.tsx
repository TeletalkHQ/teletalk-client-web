import { EmotionCache } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import Layout from "~/components/layout";
import { events } from "~/events";
import { registerWindowCustomProperties } from "~/helpers/registerWindowCustomProperties";
import MUIThemeProvider from "~/providers/MUIThemeProvider";
import ReactQueryProvider from "~/providers/ReactQueryProvider";
import {
  useGlobalStore,
  useMessageStore,
  useSettingsStore,
  useUserStore,
} from "~/store";
import createEmotionCache from "~/styles/createEmotionCache";

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
    async function fn() {
      await setClientId();

      websocket.client.connect();

      registerWindowCustomProperties();
      events.websocket.otherEvents();
    }

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setClientId = async () => {
    await fetch("http://localhost:8090/setClientId", {
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

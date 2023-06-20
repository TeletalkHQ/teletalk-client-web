import { EmotionCache } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";

import { appConfigs } from "~/classes/AppConfigs";
import { websocket } from "~/classes/websocket/Websocket";
import Layout from "~/components/layout";
import { MainContext } from "~/context/MainContext";
import { events } from "~/events";
import { registerWindowCustomProperties } from "~/helpers/registerWindowCustomProperties";
import MUIThemeProvider from "~/providers/MUIThemeProvider";
import ReactQueryProvider from "~/providers/ReactQueryProvider";
import createEmotionCache from "~/styles/createEmotionCache";

export interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function _app(props: CustomAppProps) {
  const router = useRouter();

  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  useEffect(() => {
    async function fn() {
      await setClientId();

      websocket.client.connect();

      registerWindowCustomProperties();
      events.websocket.otherEvents();

      router.push("signIn");
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
          <MainContext.Provider value={{}}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MainContext.Provider>
        </MUIThemeProvider>
        <ReactQueryDevtools />
      </ReactQueryProvider>
    </SnackbarProvider>
  );
}

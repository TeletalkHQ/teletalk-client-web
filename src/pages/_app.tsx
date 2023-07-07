import { EmotionCache } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";

import { appConfigs } from "~/classes/AppConfigs";
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

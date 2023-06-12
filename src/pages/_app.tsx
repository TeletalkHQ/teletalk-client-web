import { AppProps } from "next/app";

import { SnackbarProvider } from "notistack";
import { EmotionCache } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { appConfigs } from "~/classes/AppConfigs";

import Layout from "~/components/layout";

import { MainContext } from "~/context/MainContext";

import MUIThemeProvider from "~/providers/MUIThemeProvider";
import ReactQueryProvider from "~/providers/ReactQueryProvider";

import createEmotionCache from "~/styles/createEmotionCache";

export interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function _app(props: CustomAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

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

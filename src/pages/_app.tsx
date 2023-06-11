import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { appConfigs } from "~/classes/AppConfigs";

import Layout from "~/components/layout";

import { MainContext } from "~/context/MainContext";

import { baseTheme } from "~/theme/baseTheme";

const queryClient = new QueryClient();

export default function _app({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={appConfigs.getConfigs().ui.maxNotification}>
        <MainContext.Provider value={{}}>
          <ThemeProvider theme={baseTheme}>
            <CssBaseline enableColorScheme />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </MainContext.Provider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

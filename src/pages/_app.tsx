import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "~/components/layout";

const queryClient = new QueryClient();

export default function _app({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

import { useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
  QueryClientConfig,
} from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

export const reactQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // cacheTime: 6 * 60 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: true,
      networkMode: "offlineFirst",
    },
    mutations: {
      networkMode: "offlineFirst",
    },
  },
};

const ReactQueryProvider: React.FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient(reactQueryConfig));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

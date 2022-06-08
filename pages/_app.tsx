import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Provider } from "mobx-react";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { useStore } from "../stores";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialState);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;

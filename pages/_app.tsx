import "../styles/globals.css";

import type { AppProps } from "next/app";

import { enableLogging } from "mobx-logger";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import AppContext from "../app-context";

import AppStore from "../stores";
import AppApi from "../apis";

const store = new AppStore();
const api = new AppApi(store);

const reactQueryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <AppContext.Provider value={{ store, api }}>
        <Component {...pageProps} />
      </AppContext.Provider>

      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

enableLogging();

export default MyApp;

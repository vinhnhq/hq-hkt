import { createContext, useContext } from "react";

import AppApi from "./apis";
import AppStore from "./stores";

// we will replace api here by the react-query wapper outside of the app

interface AppContextType {
  store: AppStore;
  api?: AppApi;
}

const AppContext = createContext<null | AppContextType>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};

export default AppContext;

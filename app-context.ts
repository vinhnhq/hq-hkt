import { createContext, useContext } from "react";

import AppApi from "./apis";
import AppStore from "./stores";

interface AppContextType {
  store: AppStore;
  api: AppApi;
}

const AppContext = createContext<null | AppContextType>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};

export default AppContext;

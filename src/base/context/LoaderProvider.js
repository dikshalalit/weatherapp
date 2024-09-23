import { createContext, useContext, useState } from "react";
import Loader from "../../component/common/loader";

export const LoaderContext = createContext();

const LoadingProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);

  const showLoading = (visible) => {
    setShowLoader(visible);
  };

  return (
    <LoaderContext.Provider value={{ showLoading }}>
      {children}
      <Loader value={showLoader} />
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);

export default LoadingProvider;

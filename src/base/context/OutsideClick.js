import { createContext, useContext } from "react";

export const OutsideClickContext = createContext();

const OutsideClickProvider = ({ children }) => {
  const getComponent = (ref, onClickOutside) => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  };

  return (
    <OutsideClickContext.Provider value={{ getComponent }}>
      {children}
    </OutsideClickContext.Provider>
  );
};

export const useOutsideClick = () => useContext(OutsideClickContext);

export default OutsideClickProvider;

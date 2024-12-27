import React, { createContext, useContext } from "react";
import { Author } from "../../service";

type SearchBarContextType = {
  onResultClick: (author: Author) => void;
};

const SearchBarContext = createContext<SearchBarContextType | undefined>(
  undefined
);

export const useSearchBarContext = () => {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("useSearchBarContext must be used within SearchBarProvider");
  }
  return context;
};

export const SearchBarProvider: React.FC<{
  onResultClick: (author: Author) => void;
  children: React.ReactNode;
}> = ({ onResultClick, children }) => {
  return (
    <SearchBarContext.Provider value={{ onResultClick }}>
      {children}
    </SearchBarContext.Provider>
  );
};

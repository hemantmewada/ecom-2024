import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
const initialValues = {
  keyword: "",
  results: [],
};
export const SearchProvider = ({ children }) => {
  const [values, setValues] = useState(initialValues);
  return (
    <SearchContext.Provider value={{ values, setValues }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

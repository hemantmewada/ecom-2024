import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

const initialValue = {
  user: null,
  token: "",
};
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialValue);
  useEffect(() => {
    const localStorageData = localStorage.getItem("auth");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setAuth({
        ...auth,
        user: parsedData.data,
        token: parsedData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

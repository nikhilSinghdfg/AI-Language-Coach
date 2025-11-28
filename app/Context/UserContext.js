'use client'

import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

   useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const storedLogin = localStorage.getItem("isLogin");

    if (storedUser && storedLogin === "true") {
      setUserData(JSON.parse(storedUser));
      setIsLogin(true);
    }
  }, []);



  return (
    <AppContext.Provider value={{ isLogin, setIsLogin, userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

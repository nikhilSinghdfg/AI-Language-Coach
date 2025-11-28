'use client'

import { createContext, useContext, useState, useEffect } from "react";
import api from '../../utils/api'


const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 new

  useEffect(() => {
    async function fetchUser() {

      try {
        const res = await api.get('/api/users/me');
        if (res && res.data.user) {

          setUserData(res.data.user);
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch {
        setIsLogin(false);
      } finally {
        setLoading(false); // 👈 after check, stop loading
      }
    }

    fetchUser()
  }, []);





  return (
    <AppContext.Provider value={{ isLogin, setIsLogin, userData, loading, setUserData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

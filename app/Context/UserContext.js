'use client';
import { createContext, useContext, useState, useEffect } from "react";
import api from '../../utils/api';

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      try {
        // 1️⃣ Try with current access token
        const res = await api.get('/api/users/me');

        if (res?.data?.success && res?.data?.user) {
          setUserData(res.data.user);
          setIsLogin(true);
        } else {
          throw new Error("Access token invalid");
        }

      } catch (error) {
        console.log("Access token expired or invalid → trying refresh...");

        try {
          // 2️⃣ Try generating new access token using refresh token
          const refreshRes = await api.get('/api/users/refresh');

          if (refreshRes?.data?.success) {
            // 3️⃣ Retry profile API
            const newRes = await api.get('/api/users/me');

            if (newRes?.data?.success && newRes?.data?.user) {
              setUserData(newRes.data.user);
              setIsLogin(true);
            } else {
              setIsLogin(false);
              setUserData(null);
            }
          } else {
            setIsLogin(false);
            setUserData(null);
          }

        } catch (refreshError) {
          console.log("Refresh token failed → logging out");
          setIsLogin(false);
          setUserData(null);
        }
      } finally {
        setLoading(false); // finish UI loading
      }
    

  }

    initAuth();
}, []);

return (
  <AppContext.Provider value={{ isLogin, setIsLogin, userData, loading, setUserData }}>
    {children}
  </AppContext.Provider>
);
}

export const useAppContext = () => useContext(AppContext);

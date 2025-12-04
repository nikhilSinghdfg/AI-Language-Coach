import { useAppContext } from "@/app/Context/UserContext";
import api from "./api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAuthFetch() {
  const { setIsLogin, setUserData } = useAppContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const authFetch = async ({ url, method = "GET", body = null, headers = {} }) => {
    setLoading(true);

    try {
      // ✅ axios expects `data` for request body
      const res = await api({
        url,
        method,
        data: body,
        headers,
      });
      setLoading(false);
      return res;
    } catch (error) {
      if (error.response?.status === 401) {
        // Access token expired → try refresh
        try {
          const refreshRes = await api.get("/api/users/refresh");
          if (refreshRes.data.success) {
            // Retry original request
            const retryRes = await api({ url, method, data: body, headers });
            setLoading(false);
            return retryRes;
          } else {
            logoutUser();
          }
        } catch (refreshError) {
          logoutUser();
        }
      } else {
        setLoading(false);
        throw error;
      }
    }
  };

  const logoutUser = async () => {
    await api.get("/api/users/logout");
    setIsLogin(false);
    setUserData(null);
    router.push("/pages/Dashboard");
    toast.error("Session expired. Please login again.");
  };

  return { authFetch, loading };
}

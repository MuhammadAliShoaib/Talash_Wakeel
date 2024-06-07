import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    if (auth.role === "firm") {
      const res = await axios.get("/api/firmAuth/refreshToken", {
        withCredentials: true,
      });
      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(res.data.accessToken);
        return { ...prev, accessToken: res.data.accessToken };
      });
      return res.data.accessToken;
    } else if (auth.role === "client") {
      const res = await axios.get("/api/clientAuth/refreshToken", {
        withCredentials: true,
      });
      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(res.data.accessToken);
        return { ...prev, accessToken: res.data.accessToken };
      });
      return res.data.accessToken;
    } else if (auth.role === "lawyer") {
      const res = await axios.get("/api/lawyerAuth/refreshToken", {
        withCredentials: true,
      });
      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(res.data.accessToken);
        return { ...prev, accessToken: res.data.accessToken };
      });
    } else if (auth.role === "admin") {
      const res = await axios.get("/api/adminAuth/refreshToken", {
        withCredentials: true,
      });
      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(res.data.accessToken);
        return { ...prev, accessToken: res.data.accessToken };
      });
      return res.data.accessToken;
    }
  };

  return refresh;
};

export default useRefreshToken;

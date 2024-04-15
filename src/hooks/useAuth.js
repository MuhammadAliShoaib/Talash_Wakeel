import { useContext } from "react";
import { AuthContext } from "../config/context/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

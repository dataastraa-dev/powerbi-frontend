import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isAdminLoggedIn, adminAtom } from "../recoil/adminAtom";
import {jwtDecode} from "jwt-decode";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isAdminLoggedIn);
  const [admin, setAdmin] = useRecoilState(adminAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdmin({
          email: decoded.email,
          id: decoded.id,
          name: decoded.name,
          role: decoded.role,
        });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  }, [setAdmin, setIsLoggedIn]);
};

export default useAuth;

// hooks/useAuth.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken, isTokenExpired } from "../utils/jwt";

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = getUserFromToken();
    setUser(userData);
    setIsLoading(false);
  }, [navigate]);

  return { user, isLoading, isTokenExpired: isTokenExpired() };
};

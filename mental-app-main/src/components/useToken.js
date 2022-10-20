import { useState } from "react";
import axios from "axios";

export default function useToken() {
  const getToken = () => {
    const token = localStorage.getItem("issignedin");
    return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("issignedin", userToken);
    setToken(userToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setToken(false);
    axios.delete("/api/logout");
  };

  return {
    token,
    setToken: saveToken,
    clearToken,
  };
}

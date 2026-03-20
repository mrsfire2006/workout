import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json);
    }
    if (res.ok) {
      // save in local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);

    }
  };
  return { signup, isLoading, error };
};

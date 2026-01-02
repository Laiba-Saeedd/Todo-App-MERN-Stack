import { useRouter } from "next/navigation";
import { loginUser } from "../services/authService";
import { useState } from "react";

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    try {
      setLoading(true);
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      router.push("/todos");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}

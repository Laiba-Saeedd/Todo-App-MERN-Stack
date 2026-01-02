import { useRouter } from "next/navigation";
import { registerUser } from "../services/authService";
import { useState } from "react";

export function useRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const register = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    try {
      setLoading(true);
      await registerUser(email, password);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}

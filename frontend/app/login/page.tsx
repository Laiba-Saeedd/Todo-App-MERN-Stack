"use client";

import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const { login, loading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title={loading ? "Logging in..." : "Login"} />

        <p className="text-center">
          Don't have account?{" "}
          <a href="/register" className="text-blue-600">
            Register?
          </a>
        </p>
      </form>
    </div>
  );
}

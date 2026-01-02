"use client";

import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import { useRegister } from "../../hooks/useRegister";

export default function Register() {
  const { register, loading } = useRegister();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert("Registered successfully");
    } catch (err: any) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

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

        <Button title={loading ? "Registering..." : "Register"} />

        <p className="text-center text-sm text-gray-600">
          Already Registered?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

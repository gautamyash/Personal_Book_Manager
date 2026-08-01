"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await login({
        email,
        password,
      });

      router.push("/dashboard");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form
        onSubmit={handleSubmit}
        className="auth-card"
      >
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Welcome Back
        </h1>

        <p className="mb-6 text-slate-600">
          Log in to manage your personal library.
        </p>

        <input
          type="email"
          placeholder="Email"
          className="app-input mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="app-input mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="app-button app-button-primary w-full"
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
    </main>
  );
}

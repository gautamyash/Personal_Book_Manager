"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api/auth";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await signup({
        email,
        password,
      });

      alert("Account created successfully.");

      router.push("/login");
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
          Create Account
        </h1>

        <p className="mb-6 text-slate-600">
          Start organizing your books in one simple dashboard.
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
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}

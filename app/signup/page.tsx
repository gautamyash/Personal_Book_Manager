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
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-3xl font-bold">Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full rounded bg-black p-3 text-white"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}

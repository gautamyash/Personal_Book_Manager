"use client";

import { useState } from "react";
import type { BookFormData, BookStatus } from "@/types/book";

type Props = {
  onSubmit: (data: BookFormData) => Promise<void>;
};

export default function BookForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<BookStatus>("want");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await onSubmit({
        title,
        author,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status,
      });

      setTitle("");
      setAuthor("");
      setTags("");
      setStatus("want");
    } catch {
      // Parent dashboard shows the user-facing error.
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="app-card mb-8 p-6"
    >
      <h2 className="mb-4 text-xl font-semibold">Add Book</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="app-input"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="app-input"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          className="app-input md:col-span-2"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <select
          className="app-input"
          value={status}
          onChange={(e) => setStatus(e.target.value as BookStatus)}
        >
          <option value="want">📖 Want to Read</option>
          <option value="reading">📘 Reading</option>
          <option value="completed">✅ Completed</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="app-button app-button-primary mt-6"
      >
        {loading ? "Saving..." : "Add Book"}
      </button>
    </form>
  );
}

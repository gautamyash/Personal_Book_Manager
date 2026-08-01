"use client";

import { useState } from "react";
import type { Book, BookFormData, BookStatus } from "@/types/book";

type Props = {
  open: boolean;
  book: Book | null;
  onClose: () => void;
  onSave: (
    id: string,
    data: BookFormData,
  ) => Promise<void>;
};

export default function EditBookModal({ open, book, onClose, onSave }: Props) {
  if (!open || !book) return null;

  return (
    <EditBookForm
      key={book._id}
      book={book}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function EditBookForm({
  book,
  onClose,
  onSave,
}: {
  book: Book;
  onClose: () => void;
  onSave: Props["onSave"];
}) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [tags, setTags] = useState(book.tags.join(", "));
  const [status, setStatus] = useState<BookStatus>(book.status);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await onSave(book._id, {
        title,
        author,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status,
      });

      onClose();
    } catch {
      // Parent dashboard shows the user-facing error and the modal stays open.
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="mb-5 text-2xl font-bold">Edit Book</h2>

        <input
          className="mb-4 w-full rounded border p-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="mb-4 w-full rounded border p-3"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          className="mb-4 w-full rounded border p-3"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <select
          className="mb-6 w-full rounded border p-3"
          value={status}
          onChange={(e) => setStatus(e.target.value as BookStatus)}
        >
          <option value="want">📖 Want to Read</option>
          <option value="reading">📘 Reading</option>
          <option value="completed">✅ Completed</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded border px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="rounded bg-black px-5 py-2 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

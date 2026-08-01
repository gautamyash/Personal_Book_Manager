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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="app-card w-full max-w-lg p-6 shadow-xl"
      >
        <h2 className="mb-5 text-2xl font-bold">Edit Book</h2>

        <input
          className="app-input mb-4"
          aria-label="Book title"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="app-input mb-4"
          aria-label="Author"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          className="app-input mb-4"
          aria-label="Tags"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <select
          className="app-input mb-6"
          aria-label="Reading status"
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
            className="app-button app-button-secondary"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="app-button app-button-primary"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

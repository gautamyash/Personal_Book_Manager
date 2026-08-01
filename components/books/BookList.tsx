"use client";

import type { Book } from "@/types/book";

type Props = {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => Promise<void>;
};

export default function BookList({ books, onEdit, onDelete }: Props) {
  if (books.length === 0) {
    return (
      <div className="app-state">
        No books found.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {books.map((book) => (
        <div key={book._id} className="app-card p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-xl font-semibold">{book.title}</h3>

              <p className="mt-1 text-slate-600">{book.author}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                book.status === "want"
                  ? "bg-slate-200 text-slate-700"
                  : book.status === "reading"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {book.status === "want"
                ? "📖 Want to Read"
                : book.status === "reading"
                  ? "📘 Reading"
                  : "✅ Completed"}
            </span>
          </div>

          <div className="mt-5 flex flex-col justify-end gap-3 sm:flex-row">
            <button
              onClick={() => onEdit(book)}
              className="app-button app-button-info"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(book._id)}
              className="app-button app-button-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

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
      <div className="rounded-xl border bg-white p-8 text-center text-gray-500 shadow">
        No books found.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {books.map((book) => (
        <div key={book._id} className="rounded-xl border bg-white p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold">{book.title}</h3>

              <p className="mt-1 text-gray-600">{book.author}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                book.status === "want"
                  ? "bg-gray-200"
                  : book.status === "reading"
                    ? "bg-blue-200"
                    : "bg-green-200"
              }`}
            >
              {book.status === "want"
                ? "📖 Want to Read"
                : book.status === "reading"
                  ? "📘 Reading"
                  : "✅ Completed"}
            </span>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={() => onEdit(book)}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(book._id)}
              className="rounded bg-red-600 px-4 py-2 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

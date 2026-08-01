"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import BookForm from "@/components/books/BookForm";
import EditBookModal from "@/components/books/EditBookModal";
import BookList from "@/components/books/BookList";

import { createBook, deleteBook, getBooks, updateBook } from "@/lib/api/books";

import { logout } from "@/lib/api/auth";
import type { Book, BookFormData, BookStatus } from "@/types/book";

export default function DashboardPage() {
  const router = useRouter();

  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookStatus | "">("");
  const [tagFilter, setTagFilter] = useState("");
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const loadBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const nextAllBooks = await getBooks();
      const hasFilters = Boolean(statusFilter || tagFilter);
      const nextBooks = hasFilters
        ? await getBooks(statusFilter || undefined, tagFilter || undefined)
        : nextAllBooks;

      setAllBooks(nextAllBooks);
      setBooks(nextBooks);
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load books. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [statusFilter, tagFilter]);

  useEffect(() => {
    void Promise.resolve().then(loadBooks);
  }, [loadBooks]);

  async function handleCreate(data: BookFormData) {
    try {
      setError("");
      await createBook(data);
      await loadBooks();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create the book. Please try again.",
      );
      throw error;
    }
  }

  function handleEdit(book: Book) {
    setEditingBook(book);
  }

  async function handleUpdate(id: string, data: BookFormData) {
    try {
      setError("");
      await updateBook(id, data);
      await loadBooks();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update the book. Please try again.",
      );
      throw error;
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this book?")) return;

    try {
      setError("");
      await deleteBook(id);
      await loadBooks();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete the book. Please try again.",
      );
    }
  }

  async function handleLogout() {
    try {
      setError("");
      await logout();
      router.replace("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to log out. Please try again.",
      );
    }
  }

  const completed = allBooks.filter(
    (book) => book.status === "completed",
  ).length;

  const reading = allBooks.filter((book) => book.status === "reading").length;

  const want = allBooks.filter((book) => book.status === "want").length;

  const tagOptions = useMemo(
    () =>
      Array.from(new Set(allBooks.flatMap((book) => book.tags))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [allBooks],
  );

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Personal Book Manager
            </h1>

            <p className="mt-2 text-gray-500">Manage your reading journey.</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full rounded bg-red-600 px-5 py-3 text-white sm:w-auto"
          >
            Logout
          </button>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">Total Books</h2>

            <p className="mt-2 text-3xl font-bold">{allBooks.length}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">Want to Read</h2>

            <p className="mt-2 text-3xl font-bold">{want}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">Reading</h2>

            <p className="mt-2 text-3xl font-bold">{reading}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-gray-500">Completed</h2>

            <p className="mt-2 text-3xl font-bold">{completed}</p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 rounded-xl border bg-white p-6 shadow md:grid-cols-2">
          <div>
            <label
              htmlFor="status-filter"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Filter by Status
            </label>

            <select
              id="status-filter"
              className="w-full rounded border p-3"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as BookStatus | "")
              }
            >
              <option value="">All statuses</option>
              <option value="want">Want to Read</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="tag-filter"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Filter by Tag
            </label>

            <select
              id="tag-filter"
              className="w-full rounded border p-3"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              disabled={tagOptions.length === 0}
            >
              <option value="">All tags</option>
              {tagOptions.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <BookForm onSubmit={handleCreate} />

        {loading ? (
          <div className="rounded-xl border bg-white p-8 text-center text-gray-500 shadow">
            Loading books...
          </div>
        ) : (
          <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        <EditBookModal
          open={Boolean(editingBook)}
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSave={handleUpdate}
        />
      </div>
    </main>
  );
}

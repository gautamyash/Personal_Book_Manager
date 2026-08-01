import type { Book, BookFormData, BookStatus } from "@/types/book";

const API_URL = "/api/books";

type DeleteBookResponse = {
  message: string;
};

export async function getBooks(
  status?: BookStatus,
  tag?: string,
): Promise<Book[]> {
  const params = new URLSearchParams();

  if (status) params.append("status", status);
  if (tag) params.append("tag", tag);

  const response = await fetch(`${API_URL}?${params.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result as Book[];
}

export async function createBook(data: BookFormData): Promise<Book> {
  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result as Book;
}

export async function updateBook(
  id: string,
  data: BookFormData,
): Promise<Book> {
  const response = await fetch(`/api/books/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result as Book;
}

export async function deleteBook(id: string): Promise<DeleteBookResponse> {
  const response = await fetch(`/api/books/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result as DeleteBookResponse;
}

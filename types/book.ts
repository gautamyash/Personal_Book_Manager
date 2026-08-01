export type BookStatus = "want" | "reading" | "completed";

export type Book = {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
};

export type BookFormData = {
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
};

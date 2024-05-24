export interface Book {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  publishedAt: string;
}

export interface BookState {
  books: Book[];
  selectedBook: Book | null;
  categories: string[];
  publicationYears: string[];
  loading: boolean;
  error: string | null;
}
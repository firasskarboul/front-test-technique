import { Book } from "../types/Book";
import axiosInstance from "./api";

const bookService = {
    getAllFilteredBooks: ({ category, title, publishedyear, availability }: FilterParams) => {
        const params = new URLSearchParams();

        if (category) params.append('category', category);
        if (title) params.append('title', title);
        if (publishedyear) params.append('publishedYear', publishedyear);
        if (availability) params.append('availability', availability);

        return axiosInstance.get<Book[]>('books', { params });
    },

    getBookById: (id: string) => {
        return axiosInstance.get<Book>(`books/${id}`);
    },

    getAllCategories: () => {
        return axiosInstance.get<string[]>('categories');
    },

    getAllPublicationYears: () => {
        return axiosInstance.get<string[]>('years');
    }
}

export default bookService;
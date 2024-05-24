import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import bookService from '../../services/bookService';
import { Book, BookState } from '../../types/Book';

const initialState: BookState = {
    books: [],
    selectedBook: null,
    loading: false,
    error: null,
};

export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await bookService.getBookById(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        clearSelectedBook: (state) => {
            state.selectedBook = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchBooks.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
            //     state.books = action.payload;
            //     state.loading = false;
            // })
            // .addCase(fetchBooks.rejected, (state, action: PayloadAction<any>) => {
            //     state.error = action.payload;
            //     state.loading = false;
            // })
            .addCase(fetchBookById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookById.fulfilled, (state, action: PayloadAction<Book>) => {
                state.selectedBook = action.payload;
                state.loading = false;
            })
            .addCase(fetchBookById.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { clearSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
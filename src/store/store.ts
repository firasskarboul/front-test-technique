import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookReducer from './slices/bookSlice';
import { BookState } from '../types/Book';
import { AuthState } from '../types/auth';

const rootReducer = combineReducers({
    books: bookReducer,
    auth: authReducer,
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = {
    books: BookState;
    auth: AuthState;
}
export type AppDispatch = typeof store.dispatch;

export default store;
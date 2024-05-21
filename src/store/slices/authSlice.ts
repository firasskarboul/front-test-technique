import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';
import { AuthState, User } from '../../types/auth';

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    email: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: User, { rejectWithValue, dispatch }) => {
        try {
            const data = await authService.login(credentials);
            localStorage.setItem('token', data.token);
            await dispatch(fetchUser());
            return data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (credentials: User, { rejectWithValue }) => {
        try {
            const data = await authService.signUp(credentials);
            return data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const token = state.auth.token;
            if (!token) {
                throw new Error('No token found');
            }
            const data = await authService.fetchUser(token);
            return { email: data.email, token };
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.email = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<{ email: string }>) => {
                state.loading = false;
                state.email = action.payload.email;
            })
            .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
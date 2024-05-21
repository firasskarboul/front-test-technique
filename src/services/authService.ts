import axiosInstance from './api';
import { User } from '../types/auth';

export const login = async (credentials: User) => {
    try {
        const response = await axiosInstance.post('login', credentials);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const signUp = async (credentials: User) => {
    try {
        const response = await axiosInstance.post('register', credentials);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const fetchUser = async (token: string) => {
    try {
        const response = await axiosInstance.get('user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
import { Loan } from "../types/Booking";
import axiosInstance from "./api";

const bookingService = {
    loanBook: async (bookId: number, startDate: string, endDate: string, token: string | null) => {
        const loan: Loan = {
            bookId: bookId,
            startDate: startDate,
            endDate: endDate
        };

        try {
            const response = await axiosInstance.post('bookings', loan, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    getUserBookings: async (token: string | null) => {
        try {
            const response = await axiosInstance.get('bookings', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    cancelLoan: async (id: string, token: string | null) => {
        try {
            const response = await axiosInstance.patch(`bookings/${id}/status`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
}

export default bookingService;
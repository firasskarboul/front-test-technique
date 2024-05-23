export interface Loan {
    bookId: number;
    startDate: string;
    endDate: string;
}

export interface BookingDetails {
    startDate: string;
    endDate: string;
    status: string;
}

export interface LoanResponse {
    message: string;
    booking: BookingDetails;
}

export interface ErrorResponse {
    message: string;
}
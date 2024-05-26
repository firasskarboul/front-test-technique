import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Book } from "../types/Book";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import { formatDateDay } from '../utils/dateFormatter'
import bookingService from "../services/bookingService";

interface ModalInterface {
    openModal: boolean;
    setOpenModal: (isOpen: boolean) => void;
    book: Book
}

interface ResultData {
    message: string,
    booking: {
        startDate: string,
        endDate: string,
        status: string
    }
}

const SelectDurationModal: React.FC<ModalInterface> = ({ openModal, setOpenModal, book }) => {

    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });

    const [data, setData] = useState<ResultData>({
        message: '',
        booking: {
            startDate: '',
            endDate: '',
            status: ''
        }
    })

    const [error, setError] = useState<string>('')

    const { token } = useSelector((state: RootState) => state.auth);

    const [loading, setLoading] = useState<boolean>(false)

    const handleValueChange = (newValue: DateValueType) => {
        setValue(newValue);
        setError('')
    }

    const handleCloseModal = () => {
        setValue({ startDate: null, endDate: null })
        setData({ message: '', booking: { startDate: '', endDate: '', status: '' } })
        setError('')
        setOpenModal(false)
    }

    const handleLoan = async () => {
        setLoading(true);
        const bookId = Number(book.id);
        const startDate = value?.startDate;
        const endDate = value?.endDate;

        if (!token) {
            setError("You must sign in first.");
            setLoading(false);
            return;
        }

        if (!startDate || !endDate) {
            setError("You must choose a start date and an end date.");
            setLoading(false);
            return;
        }

        try {
            const response = await bookingService.loanBook(bookId, startDate.toString(), endDate.toString(), token);
            setData(response);
            setError('');
        } catch (error: any) {
            setError(error.message || "An unknown error occurred");
        }

        setLoading(false);
    }

    return (
        <Modal size={"6xl"} show={openModal} onClose={() => handleCloseModal()}>
            <Modal.Header>{`Select loan duration for ${book.title}`}</Modal.Header>
            <Modal.Body>
                <div className="flex flex-col justify-center items-center mb-80">
                    <Datepicker
                        primaryColor={"orange"}
                        minDate={new Date()}
                        displayFormat={"DD/MM/YYYY"}
                        value={value}
                        separator={"to"}
                        popoverDirection="down"
                        onChange={handleValueChange}
                    />
                    {error && <div className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Problem encountered: </span> {error}
                    </div>}

                    {
                        data.message !== '' && <div className="p-4 mt-2 mb-4 text-sm text-green-700 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span className="font-medium">Success: </span> {data.message}

                            <h1>Your booking details:</h1>
                            <h3>Book: {book.title}</h3>
                            <h3>Starting from: {formatDateDay(data.booking.startDate)}</h3>
                            <h3>Ending: {formatDateDay(data.booking.endDate)}</h3>
                            <h3>Status: {data.booking.status}</h3>
                        </div>
                    }
                </div>

            </Modal.Body>
            <Modal.Footer>
                {data.message === '' &&
                    <Button onClick={() => handleLoan()} className="bg-red-500 hover:bg-red-400">
                        {loading ?
                            <LoadingComponent
                                w="6"
                                h="6"
                            />
                            : "Loan"}
                    </Button>
                }
                <Button color="orange" onClick={() => handleCloseModal()}>
                    {data.message !== '' ? "Retourner" : "Cancel"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SelectDurationModal
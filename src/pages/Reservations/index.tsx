import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import LoadingComponent from '../../components/LoadingComponent'
import BookCard from '../../components/Book/BookCard'
import NoData from '../../assets/images/noData.jpg'
import { Booking } from '../../types/Booking'
import bookingService from '../../services/bookingService'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Alert, Button, Modal, Popover } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { formatDateDay } from '../../utils/dateFormatter'

const Reservations: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [booking, setBooking] = useState<Booking>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  useEffect(() => {
    getAllBookings();
  }, [notification]);

  const handleCancelModal = (value: Booking) => {
    setOpenDeleteModal(true)
    setBooking(value)
  }

  const handleCancelLoan = async () => {
    try {
      var response;
      if (booking) {
        response = await bookingService.cancelLoan(booking.id, token);
        setNotification(response.message)
      }
    } catch (error: any) {
      setNotification(`Failed to cancel booking: ${error.message}`);
    }
    setOpenDeleteModal(false)
  }

  const getAllBookings = async () => {
    setLoading(true);
    try {
      const response = await bookingService.getUserBookings(token);
      setBookings(response);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      setBookings([]);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-full">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageTitle title='Bookings' />
        <div className="lg:col-span-3">
          <div className="bg-white">
            <div className="mx-auto max-w-2xl p-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Books</h2>
              {
                notification && (
                  <Alert color="success" className='my-3' onDismiss={() => setNotification(null)}>
                    <span className="font-medium">Success!</span> {notification}
                  </Alert>
                )
              }
              {
                loading ?
                  <LoadingComponent w='12' h='12' />
                  :
                  bookings.length == 0 ?
                    <div className='flex flex-col items-center justify-center'>
                      <img src={NoData} className=' w-96 h-96' />
                      <h1>No books available</h1>
                    </div>
                    :
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {
                        bookings.map((booking) => {
                          const content = (
                            <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                              <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white">{booking.book.title}</h3>
                              </div>
                              <div className="px-3 py-2">
                                <p>{`Start date : ${formatDateDay(booking.startDate)}`}</p>
                                <p>{`End date: ${formatDateDay(booking.endDate)}`}</p>
                              </div>
                            </div>
                          );

                          return (
                            <BookCard
                              // key={booking.id}
                              book={booking.book}
                              toggleWishlist={() => setIsInWishlist(!isInWishlist)}
                              isInWishlist={isInWishlist}
                            >
                              <Popover content={content} trigger="hover">
                                <button className="w-full bg-green-200 mr-5 hover:bg-opacity-80 text-black font-bold py-2 px-4 rounded-xl focus:outline-none">
                                  {'Infos'}
                                </button>
                              </Popover>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelModal(booking)
                                }}
                                className="w-full bg-red-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-xl focus:outline-none">
                                {"Cancel"}
                              </button>
                              {/* </div> */}

                            </BookCard>

                          )
                        })
                      }
                      <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                          <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                              {`Are you sure you want to delete the booking of ${booking?.book.title}`}
                            </h3>
                            <div className="flex justify-center gap-4">
                              <Button color="failure" onClick={() => handleCancelLoan()}>
                                {"Yes, I'm sure"}
                              </Button>
                              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                                No, cancel
                              </Button>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
              }
            </div>
          </div>
        </div>
      </main>
    </div>

  )
}

export default Reservations
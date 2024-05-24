import React, { Fragment, useEffect, useState } from 'react'
import '../../App.css'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon } from '@heroicons/react/20/solid'
import MobileFilterDialog from '../../components/FilterDialog/MobileFilterDialog'
import FilterDialog from '../../components/FilterDialog/FilterDialog'
import { Book } from '../../types/Book'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent'
import NoData from '../../assets/images/noData.jpg'
import SelectDurationModal from '../../components/SelectDurationModal'
import BookCard from '../../components/Book/BookCard'
import { fetchBooks, fetchCategories, fetchPublicationYears } from '../../store/slices/bookSlice'
import { AppDispatch, RootState } from '../../store/store'

const Books: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, categories, publicationYears, loading } = useSelector((state: RootState) => state.books);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);

  const [book, setBook] = useState<Book>({
    id: '',
    title: '',
    category: '',
    description: '',
    author: '',
    publishedAt: ''
  });

  const [filters, setFilters] = useState<FilterParams>({
    category: null,
    title: null,
    publishedyear: null,
    availability: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPublicationYears());
  }, []);

  useEffect(() => {
    dispatch(fetchBooks({ category: filters.category, title: filters.title, publishedyear: filters.publishedyear, availability: filters.availability }))
  }, [filters]);

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setFilters(prev => ({ ...prev, title: newTitle }));
  };

  const handleFilterChange = (section: string, value: any) => {
    setFilters(prev => ({ ...prev, [section.toLowerCase()]: value }));
  };

  const handleLoanClick = (value: Book) => {
    setOpenDateModal(true)
    setBook(value)
  }

  return (
    <>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition show={mobileFiltersOpen} as={Fragment}>
            <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <TransitionChild
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </TransitionChild>

              <div className="fixed inset-0 z-40 flex">
                <TransitionChild
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Search</h3>
                      <div className="relative m-4">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                          </svg>
                        </div>
                        <input
                          type="search"
                          id="default-search"
                          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500"
                          onChange={handleSearchChange}
                          placeholder="Search by title"
                          value={filters.title || ''}
                        />
                      </div>

                      <MobileFilterDialog
                        section="Category"
                        options={categories}
                        onChange={(value) => handleFilterChange('Category', value)}
                        selectedValue={filters.category}
                      />
                      <MobileFilterDialog
                        section="Publication Year"
                        options={publicationYears}
                        onChange={(value) => handleFilterChange('publishedYear', value)}
                        selectedValue={filters.publishedyear}
                      />
                      <MobileFilterDialog
                        section="Availability"
                        options={["Show only available books"]}
                        onChange={(value) => handleFilterChange('Availability', value)}
                        selectedValue={filters.availability}
                      />
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </Transition>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Books List</h1>

              <div className="flex items-center">
                <button
                  type="button"
                  className="ml-4 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="books-heading" className="pb-24 pt-6">
              <h2 id="books-heading" className="sr-only">
                Books
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Search</h3>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500"
                      onChange={handleSearchChange}
                      placeholder="Search by title"
                      value={filters.title || ''}
                    />
                  </div>

                  <FilterDialog
                    section="Category"
                    options={categories}
                    onChange={(value) => handleFilterChange('Category', value)}
                    selectedValue={filters.category}
                  />
                  <FilterDialog
                    section="Publication Year"
                    options={publicationYears}
                    onChange={(value) => handleFilterChange('publishedYear', value)}
                    selectedValue={filters.publishedyear}
                  />
                  <FilterDialog
                    section="Availability"
                    options={["Show only available books"]}
                    onChange={(value) => handleFilterChange('Availability', value)}
                    selectedValue={filters.availability}
                  />
                </form>

                {/* Book grid */}
                <div className="lg:col-span-3">
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                      <h2 className="sr-only">Books</h2>

                      {
                        loading ?
                          <LoadingComponent w='12' h='12' />
                          :
                          books.length == 0 ?
                            <div className='flex flex-col items-center justify-center'>
                              <img src={NoData} className=' w-96 h-96' />
                              <h1>No books available</h1>
                            </div>
                            :
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
                              {
                                books.map((book) => {
                                  return (
                                    <BookCard
                                      book={book}
                                      toggleWishlist={toggleWishlist}
                                      isInWishlist={isInWishlist}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleLoanClick(book)
                                        }}
                                        className="w-full bg-black hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-xl focus:outline-none">
                                        {"Louer"}
                                      </button>
                                    </BookCard>
                                  )
                                }
                                )}

                            </div>
                      }

                      <SelectDurationModal
                        openModal={openDateModal}
                        setOpenModal={setOpenDateModal}
                        book={book}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default Books
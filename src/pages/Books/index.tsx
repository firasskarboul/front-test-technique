import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon } from '@heroicons/react/20/solid'
import MobileFilterDialog from '../../components/FilterDialog/MobileFilterDialog'
import FilterDialog from '../../components/FilterDialog/FilterDialog'
import '../../App.css'
import bookService from '../../services/bookService'
import { Book } from '../../types/Book'
import LoadingComponent from '../../components/LoadingComponent'
import formatDate from '../../utils/dateFormatter'
import NoData from '../../assets/images/noData.jpg'
import SelectDurationModal from '../../components/SelectDurationModal'

const Books: React.FC = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);

  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book>({
    id: '',
    title: '',
    category: '',
    description: '',
    author: '',
    publishedAt: ''
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [publicationYears, setPublicationYears] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<FilterParams>({
    category: null,
    title: null,
    publishedyear: null,
    availability: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await bookService.getAllCategories();
      setCategories(response.data);
    };

    const fetchPublicationYears = async () => {
      const response = await bookService.getAllPublicationYears();
      setPublicationYears(response.data);
    };

    fetchCategories();
    fetchPublicationYears();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookService.getAllFilteredBooks(filters);
        setBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
      setLoading(false);
    };

    fetchBooks();
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

                      {/* <MobileFilterDialog
                        section="Category"
                        options={categories}
                        onChange={(value) => handleFilterChange('Category', value)}
                      />
                      <MobileFilterDialog
                        section="Publication Year"
                        options={publicationYears}
                        onChange={(value) => handleFilterChange('publishedyear', value)}
                      />
                      <MobileFilterDialog
                        section="Availability"
                        options={["Show all books", "Show only available books"]}
                        onChange={(value) => handleFilterChange('Availability', value)}
                      /> */}
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
                                  var pubDate = formatDate(book.publishedAt)
                                  return (
                                    <div className="max-w-[327px] rounded-3xl overflow-hidden shadow-lg relative cursor-pointer transform transition duration-300 ease-in-out hover:scale-105">
                                      <div className='relative'>
                                        <img className="w-[327px] h-full object-cover scale-[110px]"
                                          src={"https://s3-alpha-sig.figma.com/img/242b/7bd7/bd5e5047576a5e06d152a6df39ed98be?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BzzJKyoZKk9PeyKC5Aa01ZbZZC5RM6I7NTkiIvpZoSuvu-R54M4Q5N5TxgPkAIqhqzfHMV0em4Dr0wJ1iK-utftmSqaTLd3PkUw288aaDtv4P-ncVl7JNTuustttcIZPwqoUnbYPU6Y8HHwJ-hR2TZEM1bxqXaXvmJLIF9nVBwcVPJktefuiu5IulirRMzjmw1kFSxNO10hHQoD9Wc8FYdVpCcENjjZMKyeDnDQ-8nF3HsGapumLLVzsJl~7lEBJQhsV8N-TobQW5beBNx88icdLs1rMBRpDmdPj7gztWvQbfARFafm3Kjz4591NgevCb~zUWRFztMWzPHHV29eKlw__"}
                                          alt={"Book image"} />
                                        <svg onClick={(e) => { e.stopPropagation(); toggleWishlist(); }} xmlns="http://www.w3.org/2000/svg" className={`absolute top-3 right-3 w-10 h-10 cursor-pointer ${isInWishlist ? 'text-yellow-400' : 'text-white'}`} fill="currentColor" viewBox="0 0 24 24">
                                          <path fillRule="evenodd" d="M11.4434703,19.4783366 L7.11534027,21.8561884 C6.53071469,22.1773786 5.80762087,21.9424899 5.50026501,21.3315498 C5.3778743,21.0882703 5.3356403,20.8096129 5.38010133,20.5387172 L6.2067006,15.5023462 C6.27323987,15.0969303 6.14461904,14.6832584 5.86275418,14.3961413 L2.36122346,10.8293635 C1.88825143,10.3475782 1.87857357,9.55633639 2.33960735,9.06207547 C2.52319342,8.86525818 2.76374635,8.73717345 3.02402575,8.69765029 L7.8630222,7.96285367 C8.25254987,7.90370429 8.58928356,7.64804097 8.76348563,7.27918144 L10.9275506,2.69693973 C11.2198634,2.07798981 11.936976,1.82386417 12.5292664,2.12933421 C12.7651196,2.25097399 12.9560234,2.45047063 13.0724239,2.69693973 L15.2364889,7.27918144 C15.410691,7.64804097 15.7474247,7.90370429 16.1369524,7.96285367 L20.9759488,8.69765029 C21.6295801,8.79690353 22.0824579,9.43108706 21.9874797,10.1141388 C21.9496589,10.3861337 21.827091,10.6375141 21.6387511,10.8293635 L18.1372204,14.3961413 C17.8553555,14.6832584 17.7267347,15.0969303 17.793274,15.5023462 L18.6198732,20.5387172 C18.7315268,21.219009 18.2943081,21.8650816 17.6433179,21.9817608 C17.3840902,22.028223 17.1174353,21.984088 16.8846343,21.8561884 L12.5565043,19.4783366 C12.2081001,19.2869252 11.7918744,19.2869252 11.4434703,19.4783366 Z" />
                                        </svg>
                                      </div>
                                      <div className="absolute bottom-0 left-0 right-0 bg-white py-[10px] px-[20px] rounded-xl shadow-top border-t border-gray-400">
                                        <div className="font-bold text-xl mb-2 truncate">{book.title + " - " + book.author}</div>
                                        <div className="flex justify-between items-center my-2">
                                          <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-green-600/20">
                                            {book.category}
                                          </span>
                                          <div className="text-sm text-left">{pubDate}</div>
                                        </div>
                                        <p className="text-gray-700 truncate-3-lines text-xs mb-2">
                                          {book.description}</p>
                                        <div className="flex justify-center">
                                          <button
                                            onClick={() => { handleLoanClick(book) }}
                                            className="w-full bg-black hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-xl focus:outline-none">
                                            {"Louer"}
                                          </button>
                                        </div>

                                      </div>
                                    </div>
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
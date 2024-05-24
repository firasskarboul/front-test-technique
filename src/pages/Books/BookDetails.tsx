import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById } from '../../store/slices/bookSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import formatDate from '../../utils/dateFormatter';
import LoadingComponent from '../../components/LoadingComponent';

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const dispatch: AppDispatch = useDispatch();
    const book = useSelector((state: RootState) => state.books.selectedBook);
    const isLoading = useSelector((state: RootState) => state.books.loading);
    const error = useSelector((state: RootState) => state.books.error);

    useEffect(() => {
        if (id)
            dispatch(fetchBookById(id));
    }, [dispatch, id]);

    if (isLoading) return <div className='mt-10'><LoadingComponent w='10' h='10' /></div>;
    if (error) return <div>Error: {error}</div>;
    if (!book) return <div className='mt-10'>No book found.</div>;

    return (

        <div className="bg-white">
            <div className="pt-6">
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{book?.title}</h1>
                    </div>

                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <img
                            src={"https://s3-alpha-sig.figma.com/img/242b/7bd7/bd5e5047576a5e06d152a6df39ed98be?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BzzJKyoZKk9PeyKC5Aa01ZbZZC5RM6I7NTkiIvpZoSuvu-R54M4Q5N5TxgPkAIqhqzfHMV0em4Dr0wJ1iK-utftmSqaTLd3PkUw288aaDtv4P-ncVl7JNTuustttcIZPwqoUnbYPU6Y8HHwJ-hR2TZEM1bxqXaXvmJLIF9nVBwcVPJktefuiu5IulirRMzjmw1kFSxNO10hHQoD9Wc8FYdVpCcENjjZMKyeDnDQ-8nF3HsGapumLLVzsJl~7lEBJQhsV8N-TobQW5beBNx88icdLs1rMBRpDmdPj7gztWvQbfARFafm3Kjz4591NgevCb~zUWRFztMWzPHHV29eKlw__"}
                            alt={"Book image"}
                            className="h-[80%] w-[80%] object-cover object-center shadow-lg border border-gray-100 rounded-sm"
                        />
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{book?.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Informations</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    <li className="text-gray-600">
                                        <span className="font-bold">{'Author: '}</span>
                                        <span className="text-gray-600">{book?.author}</span>
                                    </li>

                                    <li className="text-gray-600">
                                        <span className="font-bold">{'Category: '}</span>
                                        <span className="text-gray-600">{book?.category}</span>
                                    </li>

                                    <li className="text-gray-600">
                                        <span className="font-bold">{'Publication Date: '}</span>
                                        <span className="text-gray-600">{formatDate(book?.publishedAt)}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">

        //     <div className="lg:row-span-3 lg:mt-0">
        //         <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        //             <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{book?.title}</h1>
        //         </div>
        //         <img src={"https://s3-alpha-sig.figma.com/img/242b/7bd7/bd5e5047576a5e06d152a6df39ed98be?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BzzJKyoZKk9PeyKC5Aa01ZbZZC5RM6I7NTkiIvpZoSuvu-R54M4Q5N5TxgPkAIqhqzfHMV0em4Dr0wJ1iK-utftmSqaTLd3PkUw288aaDtv4P-ncVl7JNTuustttcIZPwqoUnbYPU6Y8HHwJ-hR2TZEM1bxqXaXvmJLIF9nVBwcVPJktefuiu5IulirRMzjmw1kFSxNO10hHQoD9Wc8FYdVpCcENjjZMKyeDnDQ-8nF3HsGapumLLVzsJl~7lEBJQhsV8N-TobQW5beBNx88icdLs1rMBRpDmdPj7gztWvQbfARFafm3Kjz4591NgevCb~zUWRFztMWzPHHV29eKlw__"}
        //             alt={"Book image"} className="object-cover w-[50%] h-[50%]" />

        //     </div>

        //     <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
        //         <div>
        //             <h3 className="sr-only">Description</h3>

        //             <div className="space-y-6">
        //                 <p className="text-base text-gray-900">{book?.description}</p>
        //             </div>
        //         </div>

        //         <div className="mt-10">
        //             <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

        //             <div className="mt-4">
        //                 <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
        //                     <li className="text-gray-400">
        //                         <span className="text-gray-600">{book?.author}</span>
        //                     </li>
        //                     <li className="text-gray-400">
        //                         <span className="text-gray-600">{book?.category}</span>
        //                     </li>
        //                     <li className="text-gray-400">
        //                         <span className="text-gray-600">{book?.publishedAt}</span>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>

        //         <div className="mt-10">
        //             <h2 className="text-sm font-medium text-gray-900">Details</h2>

        //             <div className="mt-4 space-y-6">
        //                 <p className="text-sm text-gray-600">{book?.author}</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // <div>{book?.title}</div>
    )
}

export default BookDetails
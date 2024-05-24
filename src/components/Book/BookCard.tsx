import React from 'react';
import { Book } from '../../types/Book';
import formatDate from '../../utils/dateFormatter';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
    book: Book;
    toggleWishlist: () => void;
    isInWishlist: boolean;
    children?: React.ReactNode;
}

const BookCard: React.FC<BookCardProps> = ({ book, toggleWishlist, isInWishlist, children }) => {
    const navigate = useNavigate();
    const pubDate = formatDate(book.publishedAt)

    return (
        <div onClick={() => navigate(`${book.id}`)}
            className="max-w-[327px] rounded-3xl overflow-hidden shadow-lg relative cursor-pointer transform transition duration-300 ease-in-out hover:scale-105">
            <div className='relative'>
                <img
                    className="w-full h-full object-cover"
                    src={"https://s3-alpha-sig.figma.com/img/242b/7bd7/bd5e5047576a5e06d152a6df39ed98be?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BzzJKyoZKk9PeyKC5Aa01ZbZZC5RM6I7NTkiIvpZoSuvu-R54M4Q5N5TxgPkAIqhqzfHMV0em4Dr0wJ1iK-utftmSqaTLd3PkUw288aaDtv4P-ncVl7JNTuustttcIZPwqoUnbYPU6Y8HHwJ-hR2TZEM1bxqXaXvmJLIF9nVBwcVPJktefuiu5IulirRMzjmw1kFSxNO10hHQoD9Wc8FYdVpCcENjjZMKyeDnDQ-8nF3HsGapumLLVzsJl~7lEBJQhsV8N-TobQW5beBNx88icdLs1rMBRpDmdPj7gztWvQbfARFafm3Kjz4591NgevCb~zUWRFztMWzPHHV29eKlw__"}
                    alt="Book image" />
                <svg onClick={(e) => { e.stopPropagation(); toggleWishlist(); }} xmlns="http://www.w3.org/2000/svg" className={`absolute top-3 right-3 w-10 h-10 cursor-pointer ${isInWishlist ? 'text-yellow-400' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path fillRule="evenodd" d="M11.4434703,19.4783366 L7.11534027,21.8561884 C6.53071469,22.1773786 5.80762087,21.9424899 5.50026501,21.3315498 C5.3778743,21.0882703 5.3356403,20.8096129 5.38010133,20.5387172 L6.2067006,15.5023462 C6.27323987,15.0969303 6.14461904,14.6832584 5.86275418,14.3961413 L2.36122346,10.8293635 C1.88825143,10.3475782 1.87857357,9.55633639 2.33960735,9.06207547 C2.52319342,8.86525818 2.76374635,8.73717345 3.02402575,8.69765029 L7.8630222,7.96285367 C8.25254987,7.90370429 8.58928356,7.64804097 8.76348563,7.27918144 L10.9275506,2.69693973 C11.2198634,2.07798981 11.936976,1.82386417 12.5292664,2.12933421 C12.7651196,2.25097399 12.9560234,2.45047063 13.0724239,2.69693973 L15.2364889,7.27918144 C15.410691,7.64804097 15.7474247,7.90370429 16.1369524,7.96285367 L20.9759488,8.69765029 C21.6295801,8.79690353 22.0824579,9.43108706 21.9874797,10.1141388 C21.9496589,10.3861337 21.827091,10.6375141 21.6387511,10.8293635 L18.1372204,14.3961413 C17.8553555,14.6832584 17.7267347,15.0969303 17.793274,15.5023462 L18.6198732,20.5387172 C18.7315268,21.219009 18.2943081,21.8650816 17.6433179,21.9817608 C17.3840902,22.028223 17.1174353,21.984088 16.8846343,21.8561884 L12.5565043,19.4783366 C12.2081001,19.2869252 11.7918744,19.2869252 11.4434703,19.4783366 Z" />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white py-[10px] px-[20px] rounded-b-3xl shadow-top border-t border-gray-400">
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
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
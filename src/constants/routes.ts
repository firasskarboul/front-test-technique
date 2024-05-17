import Home from "../pages/Home";
import Books from "../pages/Books";
import Reservations from "../pages/Reservations";
import Wishlist from "../pages/Wishlist";

export const ROUTES = [
    {
        name: 'Home',
        route: '/'
    },
    {
        name: 'Books',
        route: '/books'
    },
    {
        name: 'Reservations',
        route: '/reservations'
    },
    {
        name: 'Wishlist',
        route: '/wishlist'
    }
];

export const routeComponents: { [key: string]: React.FC } = {
    Home,
    Books,
    Reservations,
    Wishlist
};
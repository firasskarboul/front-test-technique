import Home from "../pages/Home";
import Books from "../pages/Books";
import Reservations from "../pages/Reservations";
import Wishlist from "../pages/Wishlist";
import Settings from "../pages/Settings";

export const ROUTE_TYPES = {HEADER: "header", USER: "user"}
export const ACCESS_TYPES = {PUBLIC: "public", PRIVATE: "private"}

export const ROUTES = [
    {
        name: 'Home',
        component: 'Home',
        route: '/',
        type: ROUTE_TYPES.HEADER,
        access: ACCESS_TYPES.PUBLIC
    },
    {
        name: 'Books',
        component: 'Books',
        route: '/books',
        type: ROUTE_TYPES.HEADER,
        access: ACCESS_TYPES.PUBLIC
    },
    {
        name: 'Reservations',
        component: 'Reservations',
        route: '/reservations',
        type: ROUTE_TYPES.HEADER,
        access: ACCESS_TYPES.PRIVATE
    },
    {
        name: 'Settings',
        component: 'Settings',
        route: '/settings',
        type: ROUTE_TYPES.USER,
        access: ACCESS_TYPES.PRIVATE
    },
    {
        name: 'Wishlist',
        component: 'Wishlist',
        route: '/wishlist',
        type: ROUTE_TYPES.USER,
        access: ACCESS_TYPES.PRIVATE
    }
];

export const routeComponents: { [key: string]: React.FC } = {
    Home,
    Books,
    Reservations,
    Wishlist,
    Settings
};
import React, { Fragment, useRef, useState } from 'react'
import Logo from '../../assets/images/logo.svg'
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, ROUTE_TYPES } from '../../constants/routes';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from '../../utils/classNamesFormatter';
import SignupModal from './Modals/SignupModal';
import LoginModal from './Modals/LoginModal';

const Header: React.FC = () => {

    const location = useLocation();
    const emailInputRef = useRef<HTMLInputElement>(null);

    const [signedIn, setSignedIn] = useState(false)
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openSignupModal, setOpenSignupModal] = useState(false);

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-red-100">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">

                                    {/* Navbar Logo (Left Side) */}
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-10"
                                            src={Logo}
                                            alt="Hupso Academy"
                                        />
                                    </div>

                                    {/* Navbar Menu (Center Side) */}
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {ROUTES.map((item) => (
                                                item.type === ROUTE_TYPES.HEADER &&
                                                <Link key={item.name} to={item.route} className={classNames(
                                                    location.pathname === item.route
                                                        ? 'bg-red-500 text-white'
                                                        : 'text-gray-900 hover:bg-red-500 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )} aria-current={location.pathname === item.route ? 'page' : undefined}>{item.name}</Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Navbar User Profile and Authentication (Right part) */}
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">

                                        {signedIn ?
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-400">
                                                        Firas Karboul
                                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-100" aria-hidden="true" />
                                                    </MenuButton>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">

                                                            {
                                                                ROUTES.map(item => (
                                                                    item.type === ROUTE_TYPES.USER &&
                                                                    <MenuItem key={item.name}>
                                                                        {({ focus }) => (
                                                                            <Link to={item.route}
                                                                                className={classNames(
                                                                                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                    'block px-4 py-2 text-sm divide-y-1'
                                                                                )} aria-current={location.pathname === item.route ? 'page' : undefined}
                                                                            >{item.name}</Link>
                                                                        )}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </div>
                                                        <div className='py-1'>
                                                            <form method="POST" action="#">
                                                                <MenuItem>
                                                                    {({ focus }) => (
                                                                        <button
                                                                            // type="submit"
                                                                            className={classNames(
                                                                                focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block w-full px-4 py-2 text-left text-sm'
                                                                            )}
                                                                            onClick={() => setSignedIn(false)}
                                                                        >
                                                                            Sign out
                                                                        </button>
                                                                    )}
                                                                </MenuItem>
                                                            </form>
                                                        </div>
                                                    </MenuItems>
                                                </Transition>
                                            </Menu> :
                                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                                <a onClick={() => setOpenLoginModal(!openLoginModal)} className="text-sm font-medium text-gray-700 hover:text-red-400 hover:cursor-pointer">
                                                    Sign in
                                                </a>

                                                <LoginModal
                                                    openSignupModal={openSignupModal}
                                                    setOpenSignupModal={setOpenSignupModal}
                                                    openLoginModal={openLoginModal}
                                                    setOpenLoginModal={setOpenLoginModal}
                                                    setSignedIn={setSignedIn}
                                                    emailInputRef={emailInputRef}
                                                />

                                                <span className="h-6 w-px bg-gray-500" aria-hidden="true" />

                                                <a onClick={() => setOpenSignupModal(!openSignupModal)} className="text-sm font-medium text-gray-700 hover:text-red-400 hover:cursor-pointer">
                                                    Create account
                                                </a>

                                                <SignupModal
                                                    openSignupModal={openSignupModal}
                                                    setOpenSignupModal={setOpenSignupModal}
                                                    openLoginModal={openLoginModal}
                                                    setOpenLoginModal={setOpenLoginModal}
                                                    setSignedIn={setSignedIn}
                                                    emailInputRef={emailInputRef}
                                                />
                                            </div>
                                        }
                                    </div>
                                </div>

                                {/* Mobile menu button */}
                                <div className="-mr-2 flex md:hidden">
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-red-500 p-2 text-red-100 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-100">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Navbar Menu */}
                        <DisclosurePanel className="md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                {ROUTES.map(item => (
                                    (item.type === ROUTE_TYPES.HEADER || signedIn) &&
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.route}
                                        className={classNames(
                                            location.pathname === item.route ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-red-500 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={location.pathname === item.route ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                            <div className="border-t border-red-300 pb-3">
                                <div className="mt-3 space-y-1 px-2">
                                    {signedIn ?
                                        <DisclosureButton
                                            as="a"
                                            onClick={() => setSignedIn(false)}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-red-500 hover:text-white"
                                        >
                                            Sign out
                                        </DisclosureButton>
                                        :
                                        <div>
                                            <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 flex-column">
                                                <a onClick={() => setOpenLoginModal(!openLoginModal)} className="text-md font-medium text-gray-700 hover:text-red-400 hover:cursor-pointer">
                                                    Sign in
                                                </a>
                                            </div>
                                            <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 flex-column pt-4">
                                                <a onClick={() => setOpenSignupModal(!openSignupModal)} className="text-md font-medium text-gray-700 hover:text-red-400 hover:cursor-pointer">
                                                    Create account
                                                </a>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default Header
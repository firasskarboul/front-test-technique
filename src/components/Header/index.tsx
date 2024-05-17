import React, { Fragment } from 'react'
import Logo from '../../assets/images/logo.svg'
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from '../../utils/classNamesFormatter';

const Header: React.FC = () => {

    const location = useLocation();

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-red-100">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-10"
                                            src={Logo}
                                            alt="Hupso Academy"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {ROUTES.map((item) => (
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
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-500">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
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
                                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {/* {userNavigation.map((item) => (
                                                        <MenuItem key={item.name}>
                                                            {({ focus }) => (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        focus ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </MenuItem>
                                                    ))} */}
                                                </MenuItems>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
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

                        <DisclosurePanel className="md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                {ROUTES.map(item => (
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
                            <div className="border-t border-red-300 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        {/* <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" /> */}
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-gray-700">{"user.name"}</div>
                                        <div className="text-sm font-medium leading-none text-gray-500">{"user.email"}</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {/* {userNavigation.map((item) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-red-500 hover:text-white"
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))} */}
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
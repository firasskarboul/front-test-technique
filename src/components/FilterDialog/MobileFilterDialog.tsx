import React from 'react'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
    section: string;
}

const MobileFilterDialog: React.FC<HeaderProps> = ({ section }) => {
    return (
        <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
            {({ open }) => (
                <>
                    <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section}</span>
                            <span className="ml-6 flex items-center">
                                {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                            </span>
                        </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                            {/* {section.options.map((option, optionIdx) => ( */}
                            <div key={"option.value"} className="flex items-center">
                                <input
                                    id={`filter-mobile-${"section.id"}-${"optionIdx"}`}
                                    name={`${"section.id"}[]`}
                                    defaultValue={"value"}
                                    type="checkbox"
                                    defaultChecked={true}
                                    className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-400"
                                />
                                <label
                                    htmlFor={`filter-mobile-${"section.id"}-${"optionIdx"}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                    {"label"}
                                </label>
                            </div>

                            <div key={"option.value"} className="flex items-center">
                                <input
                                    id={`filter-mobile-${"section.id"}-${"optionIdx"}`}
                                    name={`${"section.id"}[]`}
                                    defaultValue={"value"}
                                    type="checkbox"
                                    defaultChecked={true}
                                    className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-400"
                                />
                                <label
                                    htmlFor={`filter-mobile-${"section.id"}-${"optionIdx"}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                    {"label"}
                                </label>
                            </div>

                            <div key={"option.value"} className="flex items-center">
                                <input
                                    id={`filter-mobile-${"section.id"}-${"optionIdx"}`}
                                    name={`${"section.id"}[]`}
                                    defaultValue={"value"}
                                    type="checkbox"
                                    defaultChecked={true}
                                    className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-400"
                                />
                                <label
                                    htmlFor={`filter-mobile-${"section.id"}-${"optionIdx"}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                    {"label"}
                                </label>
                            </div>
                            {/* ))} */}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}

export default MobileFilterDialog
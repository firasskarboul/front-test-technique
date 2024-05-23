import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
    section: string;
    options: any[];
    onChange: (value: any) => void;
    selectedValue: any;
}

const FilterDialog: React.FC<HeaderProps> = ({ section, options, onChange, selectedValue }) => {

    return (
        <Disclosure as="div" className="border-b border-gray-200 py-6">
            {({ open }) => (
                <>
                    <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
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
                        <div className="space-y-4">
                            <div key={'all'} className="flex items-center">
                                <input
                                    id={`filter-all-${section}`}
                                    name={`${section}`}
                                    type="radio"
                                    checked={selectedValue === null}
                                    className="h-4 w-4 rounded-xl border-gray-300 text-red-500 focus:ring-red-400"
                                    onChange={() => onChange(null)}
                                />
                                <label
                                    htmlFor={`filter-all-${section}`}
                                    className="ml-3 text-sm text-gray-600"
                                >
                                    {"Show all"}
                                </label>
                            </div>
                            {options.map((option, optionIdx) => (
                                <div key={optionIdx} className="flex items-center">
                                    <input
                                        id={`filter-${section}-${optionIdx}`}
                                        name={`${section}`}
                                        type="radio"
                                        checked={section === "Availability" ? selectedValue === "1" : selectedValue === option}
                                        className="h-4 w-4 rounded-xl border-gray-300 text-red-500 focus:ring-red-400"
                                        onChange={() => {section === "Availability" ? onChange("1") : onChange(option)}}
                                    />
                                    <label
                                        htmlFor={`filter-${section}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                    >
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}

export default FilterDialog
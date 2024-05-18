import React from "react"
import { Modal } from "flowbite-react";

const SignupModal: React.FC<AuthModalProps> = ({openSignupModal, setOpenSignupModal, openLoginModal, setOpenLoginModal, setSignedIn, emailInputRef}) => {
    return (
        <Modal show={openSignupModal} size="lg" popup onClose={() => setOpenSignupModal(!openSignupModal)} initialFocus={emailInputRef}>
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create a new account</h3>
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                ref={emailInputRef}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                Your email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    placeholder='name@mail.com'
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                                Your password
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="password"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">

                        <button onClick={() => {
                            setSignedIn(true)
                            setOpenSignupModal(!openSignupModal)
                        }} className="text-white end-2.5 bottom-2.5 bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 ">Create an account</button>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account?&nbsp;
                        <a onClick={() => {
                            setOpenLoginModal(!openLoginModal)
                            setOpenSignupModal(!openSignupModal)
                        }} className="text-red-500 hover:underline hover:text-red-400 hover:cursor-pointer">
                            Sign in
                        </a>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SignupModal
import React, { FormEvent, useState } from "react"
import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/slices/authSlice';
import { User } from '../../../types/auth';
import { AppDispatch, RootState } from '../../../store/store';
import LoadingComponent from "../../LoadingComponent";

const LoginModal: React.FC<AuthModalProps> = ({ openSignupModal, setOpenSignupModal, openLoginModal, setOpenLoginModal, emailInputRef }) => {
    const [formData, setFormData] = useState<User>({ email: '', password: '' });
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await dispatch(login(formData));
        // setOpenLoginModal(!openLoginModal)
    }

    return (
        <Modal show={openLoginModal} size="md" popup onClose={() => setOpenLoginModal(!openLoginModal)} initialFocus={emailInputRef}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our Book Store</h3>

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
                                    value={formData.email}
                                    onChange={handleChange}
                                    ref={emailInputRef}
                                    placeholder='name@mail.com'
                                    required
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="password"
                                    required
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <button type="submit" disabled={loading}
                            className="text-white w-8/12 end-2.5 bottom-2.5 bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 disabled:bg-red-300">
                            {
                                loading ?
                                    <LoadingComponent w="5" h="5" />
                                    : "Log in to your account"
                            }
                        </button>

                        {error && <div className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">Problem encountered: </span> {error}
                        </div>}
                    </div>
                    <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?&nbsp;
                        <a onClick={() => {
                            setOpenLoginModal(!openLoginModal)
                            setOpenSignupModal(!openSignupModal)
                        }} className="text-red-500 hover:underline hover:text-red-400 hover:cursor-pointer">
                            Create account
                        </a>
                    </div>
                </form>
            </Modal.Body >
        </Modal >
    )
}

export default LoginModal
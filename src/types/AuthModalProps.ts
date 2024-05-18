interface AuthModalProps {
    openSignupModal: boolean;
    setOpenSignupModal: (isOpen: boolean) => void;
    openLoginModal: boolean;
    setOpenLoginModal: (isOpen: boolean) => void;
    setSignedIn: (isOpen: boolean) => void;
    emailInputRef: React.RefObject<HTMLInputElement>;
}
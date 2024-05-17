import React, { ReactNode } from 'react'
import Header from '../components/Header';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="p-4">
                {children}
            </main>
        </div>
    );
};

export default MainLayout
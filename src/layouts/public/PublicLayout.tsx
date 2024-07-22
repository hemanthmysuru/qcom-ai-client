// PublicLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout: React.FC = () => {
    return (
        <section className="layout protected">
            <header>
                <nav>
                    <h1>Public Header</h1>
                    {/* Add public navigation links here */}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </section>
    );
};

export default PublicLayout;

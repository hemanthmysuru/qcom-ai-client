// ProtectedLayout.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../../components/Header/Header';

const ProtectedLayout: React.FC = () => {
    const { user } = useAuth();

    // if (user === 'admin') {
    //     return <AdminLayout />;
    // } else {
    //     return <UserLayout />;
    // }

    return (
        <section className="layout protected">
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <header>
                    <h1>Protected layout</h1>
                </header>
                <main>
                    <Outlet />
                </main>

            </Box>
        </section>
    );
};

export default ProtectedLayout;

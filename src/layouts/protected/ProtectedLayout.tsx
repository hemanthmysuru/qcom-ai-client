// ProtectedLayout.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../../components/Header/Header';
import MainHeader from '../../components/MainHeader/MainHeaderComponent';
import AppFooter from '../../components/AppFooter/AppFooterComponent';

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
                {/* <MainHeader /> */}
                {/* <header>
                    <h1>Protected layout</h1>
                </header> */}
                <main style={{ height: `calc(100vh - (64px + 24px))` }}>
                    <Outlet />
                </main>
                <AppFooter />
            </Box>
        </section>
    );
};

export default ProtectedLayout;

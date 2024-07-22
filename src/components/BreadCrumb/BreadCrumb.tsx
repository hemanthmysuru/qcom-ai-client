// src/components/Breadcrumb.tsx
import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const Breadcrumb: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <Breadcrumbs aria-label="breadcrumb" onClick={onClick} sx={{ cursor: 'pointer', padding: 1 }}>
            <Link color="inherit" href="/">
                Home
            </Link>
            <Typography color="textPrimary">Menu</Typography>
        </Breadcrumbs>
    );
};

export default Breadcrumb;

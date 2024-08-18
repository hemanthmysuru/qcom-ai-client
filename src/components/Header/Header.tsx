// src/components/Header.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box, Menu, MenuItem, SwipeableDrawer, Breadcrumbs } from '@mui/material';
import { Notifications, BarChart, Settings } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
// import Breadcrumb from './Breadcrumb';
import './Header.scss';
import SvgIcon from '../SvgIcons/SvgIconComponent';
import { NavLink, useLocation } from 'react-router-dom';
import RippleEffect from '../RippleEffect/RippleEffect';
import { useAuth } from '../../context/AuthContext';

const useMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return {
        anchorEl,
        open,
        handleMenu,
        handleClose,
    };
};

const Header: React.FC = () => {
    const { anchorEl, open, handleMenu, handleClose } = useMenu();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();

    const { user, logout } = useAuth();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const swipeableDrawerRenderer = () => {
        return (
            <SwipeableDrawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <Avatar sx={{ mr: 2 }}>U</Avatar>
                        <Typography variant="h6">Username</Typography>
                    </Box>
                    <MenuItem>Alert</MenuItem>
                    <MenuItem>Analytics</MenuItem>
                    <MenuItem>Configurations</MenuItem>
                </Box>
            </SwipeableDrawer>
        )
    }

    const silhouetteRenderer = () => {
        return (
            <>
                <RippleEffect as="section" className="ripple-box user-info" onClick={handleMenu}>
                    <div className="silhouette-and-info">
                        <figure className="silhouette">{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</figure>
                        <article className="info">
                            <label>{`${user?.firstName} ${user?.lastName}`}</label>
                            <span>{user?.designation}</span>
                        </article>
                    </div>
                    <figure className="action-arrow">
                        <SvgIcon name="arrowDown" height={24} />
                    </figure>
                </RippleEffect>
                <Menu
                    className='logout-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={logout}>Logout</MenuItem>
                    {/* <MenuItem>Ops Manager</MenuItem> */}
                </Menu>
            </>
        )
    }

    const navListRenderer = () => {
        return (
            <section className="navbar-and-silhouette">
                <nav>
                    <RippleEffect as="section" className="ripple-box user-info">
                        <NavLink to="/alerts" className={({ isActive }) => (isActive ? 'selected' : '')}>
                            <SvgIcon name="bell" height={14} />
                            <label>alerts</label>
                        </NavLink>
                    </RippleEffect>
                    <RippleEffect as="section" className="ripple-box user-info">
                        <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'selected' : '')}>
                            <SvgIcon name="analytics" height={14} />
                            <label>Analytics</label>
                        </NavLink>
                    </RippleEffect>
                    <RippleEffect as="section" className="ripple-box user-info">
                        <NavLink to="/configurations" className={({ isActive }) => (isActive ? 'selected' : '')}>
                            <SvgIcon name="config" height={14} />
                            <label>Configurations</label>
                        </NavLink>
                    </RippleEffect>
                </nav>
                {silhouetteRenderer()}
                {/* <figure className="silhouette">
                    <Box>
                        <IconButton onClick={handleMenu} sx={{ ml: 2 }}>
                            <Avatar>U</Avatar>
                        </IconButton>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem disabled>Username</MenuItem>
                        <MenuItem>Designation</MenuItem>
                    </Menu>
                </figure> */}
            </section>
        )
    }

    const nonMobileViewNavListRenderer = () => {
        return navListRenderer();
    }

    const logoAndAppNameRenderer = () => {
        return (
            // <Box sx={{ display: 'flex', alignItems: 'center' }}>
            //     <Box
            //         component="img"
            //         src="/path/to/logo.png"
            //         alt="logo"
            //         sx={{ height: 40, marginRight: 1 }}
            //     />
            //     <Typography variant="h6" sx={{ color: '#6fb5ce' }}>Qualcomm AI Ops</Typography>
            // </Box>

            <figure className='logo-and-app-name'>
                {/* <img src={logo} alt="logo" /> */}
                <SvgIcon name="logoAndName" height={32} width={222} />
                {/* <figcaption>Qualcomm AI Ops</figcaption> */}
            </figure>
        )
    }

    return (
        <header className="protected-header">
            {/* <AppBar className="protected-header" position="static"> */}
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {logoAndAppNameRenderer()}
                {!isMobile && (nonMobileViewNavListRenderer())}
                {isMobile && <MenuIcon onClick={toggleDrawer(true)} />}
            </Toolbar>
            {/* </AppBar> */}
            {swipeableDrawerRenderer()}
        </header>
    );
};

export default Header;

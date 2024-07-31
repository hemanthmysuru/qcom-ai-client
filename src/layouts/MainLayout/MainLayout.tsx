import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 360;

interface MainLayoutProps {
    window?: () => Window;
    listPosition: "left" | "right";
    listContent: React.ReactNode; // Dynamic content for the scrollable list
    mainContent: React.ReactNode; // Dynamic content for the main section
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
    const { window, listContent, mainContent, listPosition } = props;
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const [isClosing, setIsClosing] = React.useState<boolean>(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            {listContent}
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            {
                (listPosition !== 'left') ? (
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                    >
                        {mainContent}
                    </Box>
                ) : ''
            }
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={listPosition}
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    anchor={listPosition}
                    sx={{
                        top: 'unset',
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, top: 'unset', height: 'calc(100% - 68px)' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {
                (listPosition !== 'right') ? (
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                    >
                        {mainContent}
                    </Box>
                ) : ''
            }

        </Box>
    );
};

export default MainLayout;

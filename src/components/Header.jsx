import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Drawer,
    List,
    ListItem,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    Leaf,
    User,
    Menu as MenuIcon,
    X as CloseIcon,
} from 'lucide-react';

const Header = ({ isLoggedIn, onShowAuth, onLogout, onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const menuItems = [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'About', href: '#about' },
    ];

    const Logo = () => (
        <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
            onClick={() => onNavigate('home')}
        >
            <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 1 }}>
                <Leaf style={{ color: 'white', width: 24, height: 24 }} />
            </Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                EcoTrack
            </Typography>
        </Box>
    );

    const DesktopMenu = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {menuItems.map((item) => (
                <Button
                    key={item.label}
                    href={item.href}
                    sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                >
                    {item.label}
                </Button>
            ))}

            {!isLoggedIn ? (
                <>
                    <Button
                        onClick={() => onShowAuth('login')}
                        sx={{ color: 'primary.main', fontWeight: 'medium' }}
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => onShowAuth('signup')}
                        variant="contained"
                        sx={{ bgcolor: 'primary.main', px: 3, py: 1 }}
                    >
                        Get Started
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        onClick={() => onNavigate('dashboard')}
                        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                        startIcon={<User size={16} />}
                    >
                        Dashboard
                    </Button>
                    <Button
                        onClick={onLogout}
                        variant="contained"
                        sx={{ bgcolor: 'error.main', px: 3, py: 1 }}
                    >
                        Logout
                    </Button>
                </>
            )}
        </Box>
    );

    const MobileMenu = () => (
        <Drawer
            anchor="top"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            sx={{ '& .MuiDrawer-paper': { boxShadow: 1 } }}
        >
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Logo />
                    <IconButton onClick={() => setMobileMenuOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.label}>
                            <Button
                                href={item.href}
                                fullWidth
                                sx={{ justifyContent: 'flex-start', color: 'text.secondary' }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Button>
                        </ListItem>
                    ))}

                    {!isLoggedIn ? (
                        <>
                            <ListItem>
                                <Button
                                    onClick={() => { onShowAuth('login'); setMobileMenuOpen(false); }}
                                    fullWidth
                                    sx={{ justifyContent: 'flex-start', color: 'primary.main', fontWeight: 'medium' }}
                                >
                                    Login
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button
                                    onClick={() => { onShowAuth('signup'); setMobileMenuOpen(false); }}
                                    fullWidth
                                    variant="contained"
                                    sx={{ bgcolor: 'primary.main' }}
                                >
                                    Get Started
                                </Button>
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem>
                                <Button
                                    onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
                                    fullWidth
                                    sx={{ justifyContent: 'flex-start', color: 'text.secondary' }}
                                >
                                    Dashboard
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button
                                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                                    fullWidth
                                    variant="contained"
                                    sx={{ bgcolor: 'error.main' }}
                                >
                                    Logout
                                </Button>
                            </ListItem>
                        </>
                    )}
                </List>
            </Box>
        </Drawer>
    );

    return (
        <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 1 }}>
            <Toolbar sx={{ maxWidth: 'lg', mx: 'auto', width: '100%' }}>
                <Logo />

                <Box sx={{ flexGrow: 1 }} />

                {!isMobile && <DesktopMenu />}

                {isMobile && (
                    <IconButton onClick={() => setMobileMenuOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                )}
            </Toolbar>

            <MobileMenu />
        </AppBar>
    );
};

export default Header;
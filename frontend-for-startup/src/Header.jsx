import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Container,
    Box,
    useMediaQuery,
    useTheme
} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLanguageStore from './stores/languageStore';
import useSignUpStore from './stores/signUpStore';

const Header = () => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const { language, setLanguage } = useLanguageStore();
    const { user, logout } = useSignUpStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lng) => {
        setLanguage(lng);
        handleClose();
    };

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    return (
        <AppBar position="static" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            textAlign: 'start',
                        }}
                    >
                        {t('startupAdmin')}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            aria-label="language"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <LanguageIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                            <MenuItem onClick={() => changeLanguage('de')}>Deutsch</MenuItem>
                        </Menu>
                        {user ? (
                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={handleLogout}
                                sx={{ ml: 2 }}
                                varioant="outlined"
                            >
                                {t('logout')}
                            </Button>
                        ) : (
                            <>
                                <Button
                                    component={Link}
                                    to="/signin"
                                    sx={{ ml: 2 }}
                                    variant={"contained"}
                                >
                                    {t('signIn')}
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;

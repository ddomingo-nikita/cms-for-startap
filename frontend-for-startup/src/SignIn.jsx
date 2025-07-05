import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Link } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useSignUpStore from './stores/signUpStore';

export const SignIn = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, isLoading, error } = useSignUpStore();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signIn(email, password);
            navigate('/events');
        } catch (error) {

        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {t('sign_in.title')}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('sign_in.email')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('sign_in.password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {t('sign_in.submit')}
                    </Button>
                    {error && <Typography color="error" textAlign={"center"}>{error}</Typography>}
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Link component={RouterLink} to="/signup" variant="body2">
                            {t('sign_in.noAccount')}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';

const theme = createTheme({
    palette: {
        primary: {
            main: '#16a34a', // green-600
        },
        secondary: {
            main: '#2563eb', // blue-600
        },
        error: {
            main: '#dc2626', // red-600
        },
    },
});

const App = () => {
    const [currentView, setCurrentView] = useState('home');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // API Base URL - Update this to your backend URL
    const API_BASE_URL = 'http://localhost:8080/api/auth';

    const handleLogin = async (loginData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', data.displayUsername || data.username || loginData.email.split('@')[0]); // Store username
                setIsLoggedIn(true);
                setShowAuthModal(false);
                setCurrentView('dashboard');
            } else {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Invalid credentials');
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText || 'Invalid credentials');
                }
            }
        } catch (err) {
            // Only show error, don't auto-login
            throw new Error(err.message || 'Login failed. Please check your credentials.');
        }
    };

    const handleSignup = async (signupData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: signupData.username,
                    email: signupData.email,
                    password: signupData.password,
                    displayUsername: signupData.username
                })
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', data.displayUsername || data.username || signupData.username); // Store username
                setIsLoggedIn(true);
                setShowAuthModal(false);
                setCurrentView('dashboard');
            } else {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Registration failed');
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText || 'Registration failed');
                }
            }
        } catch (err) {
            throw new Error(err.message || 'Registration failed. Please try again.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentView('home');
    };

    const handleShowAuth = (mode) => {
        setAuthMode(mode);
        setShowAuthModal(true);
    };

    const handleNavigate = (view) => {
        setCurrentView(view);
    };

    const handleAuthModeChange = () => {
        setAuthMode(authMode === 'login' ? 'signup' : 'login');
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header
                    isLoggedIn={isLoggedIn}
                    onShowAuth={handleShowAuth}
                    onLogout={handleLogout}
                    onNavigate={handleNavigate}
                />

                <main style={{ flexGrow: 1 }}>
                    {currentView === 'home' ? (
                        <HomePage onShowAuth={handleShowAuth} />
                    ) : (
                        <Dashboard />
                    )}
                </main>

                <Footer />

                {showAuthModal && (
                    <AuthModal
                        mode={authMode}
                        onClose={() => setShowAuthModal(false)}
                        onModeChange={handleAuthModeChange}
                        onLogin={handleLogin}
                        onSignup={handleSignup}
                    />
                )}
            </div>
        </ThemeProvider>
    );
};

export default App;
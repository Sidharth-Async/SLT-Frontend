import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    useTheme,
} from '@mui/material';
import {
    TrendingDown,
    BarChart3,
    Award,
} from 'lucide-react';

const HomePage = ({ onShowAuth }) => {
    const theme = useTheme();

    const features = [
        {
            icon: <TrendingDown size={28} />,
            title: 'Real-Time Carbon Tracking',
            description: 'Log activities like transportation, energy use, and food choices. Get instant CO2e calculations powered by Climatiq API.',
            color: 'primary',
        },
        {
            icon: <BarChart3 size={28} />,
            title: 'Interactive Dashboards',
            description: 'Visualize your emissions with beautiful charts. Track weekly and monthly trends to see your progress over time.',
            color: 'primary',
        },
        {
            icon: <Award size={28} />,
            title: 'Gamification & Badges',
            description: 'Set emission goals and earn badges for milestones. Stay motivated with personalized eco-friendly recommendations.',
            color: 'primary',
        },
    ];

    const steps = [
        {
            number: 1,
            title: 'Sign Up',
            description: 'Create your free account in seconds and set your sustainability goals.',
        },
        {
            number: 2,
            title: 'Log Activities',
            description: 'Track your daily activities like transport, energy use, meals, and waste.',
        },
        {
            number: 3,
            title: 'Reduce & Improve',
            description: 'Get personalized tips and watch your carbon footprint decrease over time.',
        },
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
                    py: 15,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
                            Track Your Carbon Footprint,
                            <br />
                            <Typography variant="h2" component="span" color="primary" sx={{ fontWeight: 'bold' }}>
                                Build a Sustainable Future
                            </Typography>
                        </Typography>
                        <Typography variant="h5" sx={{ color: 'text.secondary', mb: 4, maxWidth: 'lg', mx: 'auto' }}>
                            Monitor daily activities, calculate CO2 emissions, and receive personalized recommendations to reduce your environmental impact.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                onClick={() => onShowAuth('signup')}
                                variant="contained"
                                size="large"
                                sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                            >
                                Start Tracking Free
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderColor: 'primary.main', color: 'primary.main' }}
                            >
                                Watch Demo
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Box id="features" sx={{ py: 15, bgcolor: 'background.paper' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Powerful Features for Sustainable Living
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            Everything you need to monitor and reduce your carbon footprint
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={4} key={feature.title}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.light}40)`,
                                        border: 'none',
                                        boxShadow: 2,
                                        transition: 'all 0.3s ease-in-out',
                                        transform: 'translateY(0)',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: 6,
                                        },
                                        cursor: 'pointer',
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Box
                                            sx={{
                                                bgcolor: 'primary.main',
                                                width: 56,
                                                height: 56,
                                                borderRadius: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 3,
                                                transition: 'all 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        >
                                            <Box sx={{ color: 'white' }}>{feature.icon}</Box>
                                        </Box>
                                        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Box id="how-it-works" sx={{ py: 15, bgcolor: 'grey.50' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                            How It Works
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            Three simple steps to start your sustainable journey
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {steps.map((step) => (
                            <Grid item xs={12} md={4} key={step.number}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.25rem',
                                            fontWeight: 'bold',
                                            mx: 'auto',
                                            mb: 3,
                                        }}
                                    >
                                        {step.number}
                                    </Box>
                                    <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        {step.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* About Section */}
            <Box id="about" sx={{ py: 15, bgcolor: 'background.paper' }}>
                <Container maxWidth="md">
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
                            About EcoTrack
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, fontSize: '1.1rem' }}>
                            EcoTrack empowers individuals and organizations to take control of their environmental impact. Built with Spring Boot and powered by real-time emission data from Climatiq API, our platform makes sustainability tracking accurate, engaging, and actionable.
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                            Join thousands of users who have reduced their carbon emissions by an average of 20% through data-driven insights and personalized recommendations.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
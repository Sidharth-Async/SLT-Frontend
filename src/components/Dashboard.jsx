import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    TrendingDown,
    BarChart3,
    Award,
    Leaf,
    Car,
    Trash2,
    Zap,
    Package,
} from 'lucide-react';

const Dashboard = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        todayEmissions: 0,
        weeklyAverage: 0,
        badgesEarned: 0
    });

    useEffect(() => {
        fetchRecentActivities();
    }, []);

    const fetchRecentActivities = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            
            // Replace with your actual API endpoint
            const response = await fetch('http://localhost:8080/api/activities', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch activities');
            }
            
            const data = await response.json();
            setActivities(data);
            calculateStats(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching activities:', err);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (activitiesData) => {
        const today = new Date().toISOString().split('T')[0];
        
        // Calculate today's emissions
        const todayEmissions = activitiesData
            .filter(activity => activity.date === today)
            .reduce((sum, activity) => sum + activity.co2e, 0);
        
        // Calculate weekly average
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekActivities = activitiesData.filter(activity => 
            new Date(activity.date) >= weekAgo
        );
        const weeklyTotal = weekActivities.reduce((sum, activity) => sum + activity.co2e, 0);
        const weeklyAverage = weekActivities.length > 0 ? weeklyTotal / 7 : 0;
        
        setStats({
            todayEmissions: todayEmissions.toFixed(1),
            weeklyAverage: weeklyAverage.toFixed(1),
            badgesEarned: 12 // Keep static for now or fetch from backend
        });
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'TRANSPORT': return <Car size={20} />;
            case 'WASTE': return <Trash2 size={20} />;
            case 'ENERGY': return <Zap size={20} />;
            case 'DELIVERY': return <Package size={20} />;
            default: return <Leaf size={20} />;
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'TRANSPORT': return 'primary';
            case 'WASTE': return 'error';
            case 'ENERGY': return 'warning';
            case 'DELIVERY': return 'success';
            default: return 'info';
        }
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const isToday = date.toDateString() === today.toDateString();
        const isYesterday = date.toDateString() === yesterday.toDateString();
        
        if (isToday) {
            return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        } else if (isYesterday) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const statsCards = [
        {
            title: "Today's Emissions",
            value: `${stats.todayEmissions} kg`,
            subtitle: loading ? 'Loading...' : 'Updated just now',
            icon: <TrendingDown size={20} />,
            color: 'success',
        },
        {
            title: 'Weekly Average',
            value: `${stats.weeklyAverage} kg`,
            subtitle: 'Goal: <10 kg/day',
            icon: <BarChart3 size={20} />,
            color: 'primary',
        },
        {
            title: 'Badges Earned',
            value: '12',
            subtitle: '3 new this month',
            icon: <Award size={20} />,
            color: 'secondary',
        },
    ];

    const recommendations = [
        {
            title: 'Switch to Public Transit',
            description: 'Save up to 5kg CO2e per day by using metro instead of car for your commute.',
            icon: <Leaf size={16} />,
            color: 'success',
        },
        {
            title: 'Reduce Energy Usage',
            description: 'Your home energy consumption is 20% above average. Consider LED bulbs and smart thermostats.',
            icon: <TrendingDown size={16} />,
            color: 'primary',
        },
        {
            title: 'Meat-Free Mondays',
            description: "You're 2 weeks away from earning the 'Plant-Based Pioneer' badge!",
            icon: <Award size={16} />,
            color: 'secondary',
        },
    ];

    const username = sessionStorage.getItem('username') || 'User';

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
            <Container maxWidth="lg">
                {/* Welcome Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                        Welcome back, {username}!
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
                        Here's your sustainability overview
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {statsCards.map((stat) => (
                        <Grid item xs={12} md={4} key={stat.title}>
                            <Card sx={{ border: 1, borderColor: 'grey.200' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
                                            {stat.title}
                                        </Typography>
                                        <Box sx={{ color: stat.color + '.main' }}>{stat.icon}</Box>
                                    </Box>
                                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: stat.color + '.main', mt: 1 }}>
                                        {stat.subtitle}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Main Content Grid */}
                <Grid container spacing={3}>
                    {/* Recent Activities */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ border: 1, borderColor: 'grey.200' }}>
                            <CardContent>
                                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
                                    Recent Activities
                                </Typography>

                                {loading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                        <CircularProgress />
                                    </Box>
                                ) : error ? (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        {error}
                                    </Alert>
                                ) : activities.length === 0 ? (
                                    <Alert severity="info" sx={{ mb: 2 }}>
                                        No activities yet. Start logging your carbon footprint!
                                    </Alert>
                                ) : (
                                    <List>
                                        {activities.slice(0, 5).map((activity, index) => (
                                            <React.Fragment key={activity.id}>
                                                <ListItem sx={{ py: 2, px: 0 }}>
                                                    <Box sx={{ 
                                                        mr: 2, 
                                                        color: getActivityColor(activity.type) + '.main',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}>
                                                        {getActivityIcon(activity.type)}
                                                    </Box>
                                                    <ListItemText
                                                        primary={activity.details}
                                                        secondary={formatDateTime(activity.date)}
                                                        primaryTypographyProps={{ fontWeight: 'medium' }}
                                                    />
                                                    <Typography 
                                                        variant="body2" 
                                                        sx={{ 
                                                            color: activity.co2e > 0 ? 'error.main' : 'success.main', 
                                                            fontWeight: 'medium' 
                                                        }}
                                                    >
                                                        {activity.co2e > 0 ? '+' : ''}{activity.co2e.toFixed(1)} kg CO2e
                                                    </Typography>
                                                </ListItem>
                                                {index < Math.min(activities.length, 5) - 1 && <Divider />}
                                            </React.Fragment>
                                        ))}
                                    </List>
                                )}

                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    onClick={() => window.location.href = '/log-activity'}
                                >
                                    Log New Activity
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Recommendations */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ border: 1, borderColor: 'grey.200' }}>
                            <CardContent>
                                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
                                    Personalized Recommendations
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {recommendations.map((rec) => (
                                        <Box
                                            key={rec.title}
                                            sx={{
                                                bgcolor: rec.color + '.50',
                                                p: 2,
                                                borderRadius: 1,
                                                border: 1,
                                                borderColor: rec.color + '.200',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                                <Box
                                                    sx={{
                                                        bgcolor: rec.color + '.main',
                                                        p: 1,
                                                        borderRadius: '50%',
                                                        flexShrink: 0,
                                                        color: 'white',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {rec.icon}
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                                                        {rec.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                        {rec.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Chart Section */}
                <Card sx={{ mt: 3, border: 1, borderColor: 'grey.200' }}>
                    <CardContent>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
                            Your Carbon Journey
                        </Typography>
                        <Box
                            sx={{
                                height: 256,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'text.disabled',
                                flexDirection: 'column',
                            }}
                        >
                            <BarChart3 size={64} style={{ opacity: 0.5, marginBottom: 16 }} />
                            <Typography>Chart visualization will be displayed here</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                (Integrate Chart.js for detailed analytics)
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Dashboard;
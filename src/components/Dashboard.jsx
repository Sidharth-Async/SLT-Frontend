import React from 'react';
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
} from '@mui/material';
import {
    TrendingDown,
    BarChart3,
    Award,
    Leaf,
} from 'lucide-react';

const Dashboard = () => {
    const stats = [
        {
            title: "Today's Emissions",
            value: '4.2 kg',
            subtitle: '↓ 15% from yesterday',
            icon: <TrendingDown size={20} />,
            color: 'success',
        },
        {
            title: 'Weekly Average',
            value: '6.8 kg',
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

    const activities = [
        {
            name: 'Car commute - 15km',
            time: 'Today, 8:30 AM',
            emission: '+3.2 kg CO2e',
            color: 'error',
        },
        {
            name: 'Vegetarian lunch',
            time: 'Today, 1:00 PM',
            emission: '+0.8 kg CO2e',
            color: 'success',
        },
        {
            name: 'Home energy - 12 kWh',
            time: 'Yesterday',
            emission: '+4.5 kg CO2e',
            color: 'warning',
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
                    {stats.map((stat) => (
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
                                <List>
                                    {activities.map((activity, index) => (
                                        <React.Fragment key={activity.name}>
                                            <ListItem sx={{ py: 2 }}>
                                                <ListItemText
                                                    primary={activity.name}
                                                    secondary={activity.time}
                                                    primaryTypographyProps={{ fontWeight: 'medium' }}
                                                />
                                                <Typography variant="body2" sx={{ color: activity.color + '.main', fontWeight: 'medium' }}>
                                                    {activity.emission}
                                                </Typography>
                                            </ListItem>
                                            {index < activities.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2 }}
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
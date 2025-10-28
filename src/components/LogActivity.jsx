import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    MenuItem,
    Grid,
    Alert,
    CircularProgress,
    InputAdornment,
} from '@mui/material';
import {
    Car,
    Trash2,
    Zap,
    Package,
    ArrowLeft,
} from 'lucide-react';

const LogActivity = () => {
    const [formData, setFormData] = useState({
        type: '',
        date: new Date().toISOString().split('T')[0],
        details: '',
        distance: '',
        vehicleType: '',
        wasteType: '',
        weight: '',
        energySource: '',
        consumption: '',
        deliveryType: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const activityTypes = [
        { value: 'TRANSPORTATION', label: 'Transportation', icon: <Car size={20} /> },
        { value: 'WASTE', label: 'Waste', icon: <Trash2 size={20} /> },
        { value: 'ENERGY', label: 'Energy', icon: <Zap size={20} /> },
        { value: 'DELIVERY', label: 'Delivery', icon: <Package size={20} /> },
    ];

    const vehicleTypes = [
        { value: 'CAR', label: 'Car' },
        { value: 'MOTORCYCLE', label: 'Motorcycle' },
        { value: 'BUS', label: 'Bus' },
        { value: 'TRAIN', label: 'Train' },
        { value: 'BICYCLE', label: 'Bicycle' },
    ];

    const wasteTypes = [
        { value: 'PLASTIC', label: 'Plastic' },
        { value: 'PAPER', label: 'Paper' },
        { value: 'GLASS', label: 'Glass' },
        { value: 'METAL', label: 'Metal' },
        { value: 'ORGANIC', label: 'Organic' },
        { value: 'ELECTRONIC', label: 'Electronic' },
    ];

    const energySources = [
        { value: 'ELECTRICITY', label: 'Electricity' },
        { value: 'NATURAL_GAS', label: 'Natural Gas' },
        { value: 'SOLAR', label: 'Solar' },
        { value: 'WIND', label: 'Wind' },
    ];

    const deliveryTypes = [
        { value: 'STANDARD', label: 'Standard Delivery' },
        { value: 'EXPRESS', label: 'Express Delivery' },
        { value: 'OVERNIGHT', label: 'Overnight' },
        { value: 'LOCAL', label: 'Local Pickup' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const buildActivityDetails = () => {
        switch (formData.type) {
            case 'TRANSPORTATION':
                return `${formData.vehicleType} - ${formData.distance} km`;
            case 'WASTE':
                return `${formData.wasteType} waste - ${formData.weight} kg`;
            case 'ENERGY':
                return `${formData.energySource} - ${formData.consumption} kWh`;
            case 'DELIVERY':
                return `${formData.deliveryType}`;
            default:
                return formData.details;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            
            // Build the activity object based on type
            const activityData = {
                type: formData.type,
                date: formData.date,
                details: buildActivityDetails(),
            };

            // Add type-specific fields
            if (formData.type === 'TRANSPORTATION') {
                activityData.distance = parseFloat(formData.distance);
                activityData.vehicleType = formData.vehicleType;
            } else if (formData.type === 'WASTE') {
                activityData.wasteType = formData.wasteType;
                activityData.weight = parseFloat(formData.weight);
            } else if (formData.type === 'ENERGY') {
                activityData.energySource = formData.energySource;
                activityData.consumption = parseFloat(formData.consumption);
            } else if (formData.type === 'DELIVERY') {
                activityData.deliveryType = formData.deliveryType;
            }

            
            const response = await fetch('http://localhost:8080/api/activities', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(activityData)
            });

            if (!response.ok) {
                throw new Error('Failed to log activity');
            }

            const result = await response.json();
            setSuccess(true);
            
            // Reset form
            setFormData({
                type: '',
                date: new Date().toISOString().split('T')[0],
                details: '',
                distance: '',
                vehicleType: '',
                wasteType: '',
                weight: '',
                energySource: '',
                consumption: '',
                deliveryType: '',
            });

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderTypeSpecificFields = () => {
        switch (formData.type) {
            case 'TRANSPORTATION':
                return (
                    <>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Vehicle Type"
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleChange}
                                required
                            >
                                {vehicleTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Distance"
                                name="distance"
                                value={formData.distance}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </>
                );

            case 'WASTE':
                return (
                    <>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Waste Type"
                                name="wasteType"
                                value={formData.wasteType}
                                onChange={handleChange}
                                required
                            >
                                {wasteTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </>
                );

            case 'ENERGY':
                return (
                    <>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Energy Source"
                                name="energySource"
                                value={formData.energySource}
                                onChange={handleChange}
                                required
                            >
                                {energySources.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Consumption"
                                name="consumption"
                                value={formData.consumption}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </>
                );

            case 'DELIVERY':
                return (
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Delivery Type"
                            name="deliveryType"
                            value={formData.deliveryType}
                            onChange={handleChange}
                            required
                        >
                            {deliveryTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                );

            default:
                return null;
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
            <Container maxWidth="md">
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Button
                        startIcon={<ArrowLeft size={20} />}
                        onClick={() => window.location.href = '/dashboard'}
                        sx={{ mb: 2 }}
                    >
                        Back to Dashboard
                    </Button>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                        Log New Activity
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
                        Track your carbon footprint by logging your daily activities
                    </Typography>
                </Box>

                {/* Success Message */}
                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Activity logged successfully! Redirecting to dashboard...
                    </Alert>
                )}

                {/* Error Message */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {/* Form Card */}
                <Card sx={{ border: 1, borderColor: 'grey.200' }}>
                    <CardContent sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* Activity Type */}
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Activity Type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                        helperText="Select the type of activity you want to log"
                                    >
                                        {activityTypes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {option.icon}
                                                    {option.label}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {/* Date */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                {/* Type-specific fields */}
                                {renderTypeSpecificFields()}

                                {/* Additional Details (Optional) */}
                                {formData.type && (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={3}
                                            label="Additional Details (Optional)"
                                            name="details"
                                            value={formData.details}
                                            onChange={handleChange}
                                            placeholder="Add any additional information about this activity..."
                                        />
                                    </Grid>
                                )}

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        disabled={loading || !formData.type}
                                        sx={{ py: 1.5 }}
                                    >
                                        {loading ? (
                                            <>
                                                <CircularProgress size={20} sx={{ mr: 1 }} />
                                                Logging Activity...
                                            </>
                                        ) : (
                                            'Log Activity'
                                        )}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card sx={{ mt: 3, bgcolor: 'info.50', border: 1, borderColor: 'info.200' }}>
                    <CardContent>
                        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                            💡 How CO2e is Calculated
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Your CO2 equivalent (CO2e) emissions are automatically calculated based on your activity type and details. 
                            This helps you understand your environmental impact and make more sustainable choices.
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default LogActivity;
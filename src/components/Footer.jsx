import React from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
    Grid,
    Divider,
} from '@mui/material';
import { Leaf } from 'lucide-react';

const Footer = () => {
    const footerSections = [
        {
            title: 'Product',
            links: ['Features', 'Pricing', 'API'],
        },
        {
            title: 'Resources',
            links: ['Documentation', 'Blog', 'Support'],
        },
        {
            title: 'Company',
            links: ['About', 'Contact', 'Privacy'],
        },
    ];

    return (
        <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.300', py: 8 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Brand */}
                    <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 1 }}>
                                <Leaf style={{ color: 'white', width: 20, height: 20 }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                                EcoTrack
                            </Typography>
                        </Box>
                        <Typography variant="body2">
                            Empowering sustainable living through data-driven insights and actionable recommendations.
                        </Typography>
                    </Grid>

                    {/* Footer Links */}
                    {footerSections.map((section) => (
                        <Grid item xs={12} sm={6} md={3} key={section.title}>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'semibold', mb: 2 }}>
                                {section.title}
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            variant="body2"
                                            sx={{
                                                color: 'grey.300',
                                                textDecoration: 'none',
                                                '&:hover': { color: 'primary.light' },
                                                display: 'block',
                                                py: 0.5,
                                            }}
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ borderColor: 'grey.800', mt: 4, mb: 3 }} />

                <Typography variant="body2" sx={{ textAlign: 'center', color: 'grey.400' }}>
                    &copy; 2025 EcoTrack. Powered by Climatiq API. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
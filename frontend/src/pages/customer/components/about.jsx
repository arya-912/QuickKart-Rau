import React from 'react';
import { Container, Typography, Box, Divider, Paper } from '@mui/material';
import { styled } from 'styled-components';

const About = () => {
    return (
        <Wrapper>
            <StyledPaper elevation={4}>
                <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                    Welcome to QuickKart
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Section>
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                        At <strong>QuickKart</strong>, we believe in empowering local businesses by bringing their shops online.
                        Whether you're a seller looking to reach more customers or a shopper searching for great local finds, 
                        QuickKart makes it simple, fast, and accessible.
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                        Our platform lets customers browse a variety of locally listed products, bookmark favorites,
                        and make secure purchases. Sellers can manage their mini-shop, track orders, and easily upload products — 
                        all through an intuitive interface optimized for mobile and desktop.
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                        We’re focused on simplicity, speed, and reliability — so your shopping or selling experience is always smooth.
                    </Typography>
                </Section>

                <Divider sx={{ my: 4 }} />

                <Section>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Get in Touch
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                        📞 <strong>Phone:</strong> 987-456-2986
                        <br />
                        📧 <strong>Email:</strong> support@quickkart.com
                    </Typography>
                </Section>
            </StyledPaper>
        </Wrapper>
    );
};

export default About;

// Styled Components
const Wrapper = styled(Container)`
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 20px;
`;

const StyledPaper = styled(Paper)`
    padding: 40px;
    border-radius: 20px;
    max-width: 900px;
    margin: auto;
    background-color: #fafafa;
`;

const Section = styled(Box)`
    margin-top: 20px;
`;


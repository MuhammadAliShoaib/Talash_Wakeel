import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';
import { styled } from '@mui/system';
import Image from "../../assets/logoIcon.png"

const FooterContainer = styled('footer')(({ theme }) => ({
    backgroundColor: '#000',
    padding: theme.spacing(6, 0),
}));

const FooterLink = styled(Link)(({ theme }) => ({
    margin: theme.spacing(1, 0),
}));


const Map = styled('iframe')(({ theme }) => ({
    border: 0,
    width: '100%',
    height: 200,
    [theme.breakpoints.up('sm')]: {
        width: 300,
        height: 200,
    },
}));

export const Footer = () => {
    return (
        <FooterContainer>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
                    <Grid item xs={12} sm={6} md={3} >
                        <img src={Image} alt="Company Logo" style={{ width: '100%', height: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ alignSelf: 'center' }}>
                        <Typography variant="h6" gutterBottom color="white">
                            Company
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
                            <li>
                                <FooterLink href="#" color="#fff">
                                    About Us
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="#" color="#fff">
                                    Careers
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="#" color="#fff">
                                    Press
                                </FooterLink>
                            </li>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ alignSelf: 'center' }}>
                        <Typography variant="h6" gutterBottom color="white">
                            Contact
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
                            <li>
                                <FooterLink href="#" color="#fff">
                                    Contact Us
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="#" color="#fff">
                                    Support
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="#" color="#fff">
                                    Privacy Policy
                                </FooterLink>
                            </li>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom color="white">
                            Location
                        </Typography>
                        <Map
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0868446271975!2d-122.41941508468149!3d37.77492977975982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c00000001%3A0x9e8f7bfaf6780a16!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1608163788533!5m2!1sen!2sus"
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                        ></Map>
                    </Grid>
                </Grid>
                <Grid container spacing={4} justifyContent={'center'}>
                    <Grid item xs={12} sm={6} md={3}>

                        <Typography
                            variant="body2"
                            color="textSecondary"
                            align="center"
                            sx={{ marginTop: 2, }}
                        >
                            {'© '}
                            <Link color="#fff" href="#">
                                © 2024. All rights reserved.
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'. All rights reserved.'}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </FooterContainer>
    );
};

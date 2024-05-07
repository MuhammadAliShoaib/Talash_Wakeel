import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Image1 from '../../assets/tkLogoWhite.png';
import Image2 from '../../assets/firm.jpeg';
import SearchIcon from '@mui/icons-material/Search';
import Work from '../../components/Work';
import TimeLine from '../../components/Timeline';
import Navbar from '../../components/Navbar';

export default function LandingPage() {
    return (
        <div style={{ overflow: 'hidden' }}>
            <Navbar />
            <Container maxWidth={false} disableGutters>
                <Container maxWidth={false} sx={{ mt: 5, textAlign: 'center' }} disableGutters>
                    <Grid container spacing={3} sx={{ paddingX: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={12} md={6}>
                            <span className="header2">TalashWakeel.pk</span>
                            <br />
                            <span className="subHeading">Empower Your Legal Journey With Us</span>
                            <br />
                            <span className="header3">
                                Welcome to TalaskWakeel.pk, your trusted Advocates & Legal Consultants in all the legal matters. At TalashWakeel.pk we understand that navigating the complexities of the legal landscape can be a daunting task. That’s why we’re here to guide you through every step with expertise, dedication, and unwavering commitment. As a premier law firm in Pakistan, we offer a comprehensive range of legal services to cater to your diverse needs, ensuring that you receive the best possible legal solutions.
                            </span>
                        </Grid>
                        <Grid item >
                            <img src={Image1} width={"100%"} height={"100%"} alt="Bus" />
                        </Grid>
                    </Grid>


                    <Grid container spacing={3} sx={{ marginY: '10px', backgroundColor: '#000', marginX: 0, paddingY: '20px', width: '100vw' }}>
                        <Grid container spacing={3} sx={{ marginY: 1 }}>
                            <Grid item xs={12}>
                                <span className="header2" style={{ fontSize: "2.5rem", color: '#ffffff' }}>
                                    How Does it work?
                                </span>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ marginY: 1 }}>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4} sx={{ padding: 0, display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ padding: "15px" }}>
                                            <Work image={Image2} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4} sx={{ padding: 0, display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ padding: "15px" }}>
                                            <Work image={Image2} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4} sx={{ padding: 0, display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ padding: "15px" }}>
                                            <Work image={Image2} />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid container spacing={3} sx={{ marginY: 1 }}>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <span className="header2" style={{ fontSize: "2.5rem" }}>
                                            Legal Specialties
                                        </span>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TimeLine />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        </div>
    );
}

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
        <>
            <Navbar />
            <Container maxWidth="false">
                <Container maxWidth="false" sx={{ mt: 5}}>
                    <Grid container spacing={3} >
                        <Grid item xs={12} md={6}>
                            <div>
                                <span className="header2">TalashWakeel.pk</span>
                                <br />
                                <span className="subHeading">Empower Your Legal Journey With Us</span>
                                <br />
                                <span className="header3">
                                    TalashWakeel.pk, based on the management of professional work. Useful inversi   on for both lawyers and clients, removing the barriers between the two parties.Allowing users to find lawyers in different lawyer’s firms based on their requirements
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={Image1} style={{ width: '100%', height: '100%' }} alt="Bus" />
                        </Grid>
                    </Grid>


                    <Grid container spacing={3}>
                        <Grid container spacing={3} sx={{ marginY: 1 }}>
                            <Grid item xs={12} >
                                <span className="header2" style={{ fontSize: "2.5rem" }}>
                                    How Does it work?
                                </span>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ marginY: 1 }}>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <div style={{ padding: "15px" }}>
                                            <Work image={Image2} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <div style={{ padding: "15px" }}>
                                            <Work image={Image2} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
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
                                <Grid container spacing={3} >
                                    <Grid item xs={12}>
                                        <span className="header2" style={{ fontSize: "2.5rem" }}>
                                            Main Features
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
            </Container >
        </>
    );
}
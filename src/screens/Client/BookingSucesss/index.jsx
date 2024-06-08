import React from 'react'
import Header from '../../../components/Header'
import { useParams } from 'react-router-dom'
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from "../../../assets/accept.png"

export const BookingSucesss = () => {

    const { id } = useParams();

    return (
        <>
            <Header title="Booking Payment" />
            <Box
                sx={{
                    position: 'absolute',
                    width: "90%",
                    maxWidth: "400px",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ color: "black" }}>
                    Transaction Successfull
                </Typography>
                <img src={Image} style={{ width: '50px', height: '50px' }} />

                <Grid item xs={12} sm={6} sx={{ marginBottom: "15px" }}>

                </Grid>
                <Button variant="contained">
                    Ok
                </Button>
            </Box>
        </>
    )
}

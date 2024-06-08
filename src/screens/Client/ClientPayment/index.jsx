import React from 'react'
import Header from '../../../components/Header'
import { Button, Container, Grid } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

export const ClientPayment = () => {

    const axiosPrivate = useAxiosPrivate();


    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51PPUiWBIdeT3bEotMd4YOfCRcvyT3ttXFWSpXnpdfRhqhYXOMQI6AW7LtyWwvjWZsDcm8aCYcu6mcuclf0l0f20t00cJu1my69")
        const paymentData = {
            appointment: {}
        }

        axiosPrivate
            .post(
                "/client/create-checkout-session",
                paymentData
            )
            .then((response) => {
                stripe.redirectToCheckout({ sessionId: response.data.id })
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <>
            <Header title="Payment" />
            <Container maxWidth="false" disableGutters sx={{ padding: "10px" }}>
                <Grid container spacing={2} sx={{ my: 0 }}>
                    <Grid item xs={12} md={2}></Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ display: "flex", alignItems: "center" }}
                    ></Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            displa: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            onClick={makePayment}
                            href=""
                            size="medium"
                            variant="contained"
                        >
                            Payment
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

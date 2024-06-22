import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Button, Container, Grid } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import PaymentTable from "../../../components/PaymentTable";

export const ClientPayment = () => {
  const [payments, setPayments] = useState();
  const [flag, setFlag] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const getPayments = async () => {
    try {
      const res = (
        await axiosPrivate.get("/client/getPayments", {
          params: { id: auth?.clientID },
        })
      ).data;
      if (!res) {
        throw new Error("An Error Occurred");
      }
      setPayments(res);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const makePayment = async (appointmentId, pendingAmount) => {
    const stripe = await loadStripe(
      "pk_test_51PPMcbGTQPnrhQONJ6mYJ7MMjOyDfIFaiNrUVSBXQBuvK5IsvyfXvG9JX2D04dymhTqCd5pF1QoyXPZKba66CYw900NbjTbFU9"
    );
    const paymentData = {
      appointmentId,
      pendingAmount,
    };

    axiosPrivate
      .post("/client/create-checkout-session", paymentData)
      .then((response) => {
        stripe.redirectToCheckout({ sessionId: response.data.id });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setFlag(!flag);
  };

  useEffect(() => {
    getPayments();
  }, [flag]);

  return (
    <>
      <Header title="Payment" />
      <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            style={{ paddingTop: "5px", paddingBottom: "10px" }}
          >
            <PaymentTable payments={payments} makePayment={makePayment} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

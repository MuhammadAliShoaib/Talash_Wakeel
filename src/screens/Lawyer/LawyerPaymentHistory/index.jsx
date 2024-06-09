import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Button, Container, Grid } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import PaymentTable from "../../../components/PaymentTable";

export const LawyerPaymentHistory = () => {
  const [payments, setPayments] = useState();
  const [flag, setFlag] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const getPayments = async () => {
    try {
      const res = (
        await axiosPrivate.get("/lawyer/getPayments", {
          params: { id: auth?.lawyerCouncilId },
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

  useEffect(() => {
    getPayments();
  }, []);

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
            <PaymentTable payments={payments} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

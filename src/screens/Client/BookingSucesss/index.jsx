import React from "react";
import Header from "../../../components/Header";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "../../../assets/accept.png";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const BookingSucesss = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const updatePayment = async () => {
    const appointmentId = id.slice(1);
    try {
      const res = (
        await axiosPrivate.put("/client/updatePayment", {
          appointmentId,
          paymentStatus: "Paid",
        })
      ).data;

      if (!res) throw new Error("An Error Occured");

      toast.success(`${res.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/client/payment");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Header title="Booking Payment" />
      <Box
        sx={{
          position: "absolute",
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
        <img src={Image} style={{ width: "50px", height: "50px" }} />

        <Grid item xs={12} sm={6} sx={{ marginBottom: "15px" }}></Grid>
        <Button variant="contained" onClick={updatePayment}>
          Ok
        </Button>
      </Box>
    </>
  );
};

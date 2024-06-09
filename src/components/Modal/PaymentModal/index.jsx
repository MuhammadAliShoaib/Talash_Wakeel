import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPrivate from "../../../api/axiosPrivate";
import { toast } from "react-toastify";

export const PaymentModal = ({ open, onClose, data, setFlag, flag }) => {
  const [payment, setPayment] = useState(0);

  const { auth } = useAuth();

  const requestPayment = async () => {
    if (payment <= 0) {
      toast.error(`Invalid Amount`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    try {
      const res = await axiosPrivate.post(`/lawyer/requestPayment`, {
        appointmentId: data.appointmentId,
        clientID: data.clientID,
        lawyerCouncilId: auth?.lawyerCouncilId,
        firmCouncilId: auth?.firmCouncilId,
        paymentAmount: payment,
        paymentStatus: "Pending",
      });

      if (!res) {
        throw new Error("An Error Occured");
      }

      toast.success(`${res.data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFlag(!flag);
      onClose();
    } catch (error) {
      console.log("Error: ", error);
      if (error.res && error.res.status === 500) {
        toast.error(`${error.res.data.message}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
          Follow Up Appointment
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" gutterBottom>
            Appointment ID: {data?.appointmentId}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Client ID: {data?.clientID}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Client Name: {data?.clientDetails.clientFirstName}{" "}
            {data?.clientDetails.clientLastName}
          </Typography>
        </Box>
        <Grid sx={{ paddingBottom: "10px" }}>
          <TextField
            required
            sx={{
              width: "62%",
            }}
            type="number"
            name="payment"
            onChange={(e) => setPayment(e.target.value)}
            label="Payment Amount"
            value={payment}
            variant="outlined"
          />
        </Grid>
        <Button onClick={requestPayment} variant="contained">
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

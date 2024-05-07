import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useAuth from "../../../hooks/useAuth";
import axiosPrivate from "../../../api/axiosPrivate";
import { toast } from "react-toastify";

export const BookLawyerModal = ({ open, onClose, data, firmId }) => {
  const { auth } = useAuth();
  const [error, setError] = useState(false);

  const [date, setDate] = useState("");

  const handleDateChange = (selectedDate) => {
    // console.log((dayjs(selectedDate).$d).toLocaleDateString())
    setDate(dayjs(selectedDate).$d.toLocaleDateString());
  };

  const book = async () => {
    // if (date == null) {
    //     setError(true)
    //     return
    // }
    try {
      const res = await axiosPrivate.post(`/client/bookAppointment`, {
        firmBarCouncilId: firmId,
        lawyerBarCouncilId: data.lawyerBarCouncilId,
        lawyerName: data.firstName,
        clientID: auth.clientID,
        clientName: auth.name,
        bookingDate: date,
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
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-details-modal"
      aria-describedby="user-details-input"
    >
      <Box
        // component="form"
        // noValidate
        // onSubmit={book}
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
          Book Lawyer
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" gutterBottom>
            Name: {data.firstName} {data.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {data.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Field: {data.field}
          </Typography>
        </Box>
        <Grid sx={{ paddingBottom: "10px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Appointment date"
              // value={date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          {error ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              Please select date
            </Box>
          ) : null}
        </Grid>
        <Button onClick={book} variant="contained">
          Confirm Booking
        </Button>
      </Box>
    </Modal>
  );
};

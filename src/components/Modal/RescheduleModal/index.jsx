import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useAuth from "../../../hooks/useAuth";
import axiosPrivate from "../../../api/axiosPrivate";
import { toast } from "react-toastify";
import { MobileTimePicker } from "@mui/x-date-pickers";

export const RescheduleModal = ({ open, onClose, data, setFlag, flag }) => {
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(dayjs("2022-04-17T15:30"));

  const handleTimeChange = (newTime) => {
    console.log("Type: ", typeof newTime);
    setSelectedTime(newTime.format("hh:mm A"));
    console.log("Selected time:", newTime.format("hh:mm A")); // Format the time if needed
  };

  const handleDateChange = (selectedDate) => {
    setDate(dayjs(selectedDate).$d.toLocaleDateString());
  };

  const handleReschedule = async () => {
    try {
      const res = await axiosPrivate.put(`/lawyer/rescheduleAppointment`, {
        appointmentId: data.appointmentId,
        updatedBookingDate: date,
        updatedBookingTime: selectedTime,
        updatedStatus: "Rescheduled",
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
          Reschedule Appointment
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" gutterBottom>
            Appointment ID: {data?.appointmentId}
          </Typography>
        </Box>
        <Grid sx={{ paddingBottom: "10px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              sx={{ width: "60%" }}
              defaultValue={dayjs("2022-04-17T15:30")}
              onChange={handleTimeChange}
            />
          </LocalizationProvider>
        </Grid>
        <Grid sx={{ paddingBottom: "10px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Appointment date" onChange={handleDateChange} />
          </LocalizationProvider>
          {/* {error ? (
              <Box component={"span"} sx={{ display: "inline", color: "red" }}>
                Please select date
              </Box>
            ) : null} */}
        </Grid>
        <Button onClick={handleReschedule} variant="contained">
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

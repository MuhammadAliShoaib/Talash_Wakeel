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

export const FollowUpModal = ({ open, onClose, data, setFlag, flag }) => {
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("");

  const getCurrentDateWithTime = () => {
    return dayjs().hour(15).minute(30).second(0).millisecond(0);
  };
  const [selectedTime, setSelectedTime] = useState(
    getCurrentDateWithTime().format("hh:mm A")
  );

  const handleTimeChange = (newTime) => {
    console.log("Type: ", typeof newTime);
    setSelectedTime(newTime.format("hh:mm A"));
    console.log("Selected time:", newTime.format("hh:mm A")); // Format the time if needed
  };

  const handleDateChange = (selectedDate) => {
    setDate(dayjs(selectedDate).$d.toLocaleDateString());
  };

  const handleFollowUp = async () => {
    try {
      if (mode === "") {
        toast.error(`Please Select Mode`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      const res = await axiosPrivate.put(`/lawyer/followUpAppointment`, {
        appointmentId: data.appointmentId,
        updatedMode: mode,
        updatedBookingDate: date,
        updatedBookingTime: selectedTime,
        updatedStatus: "Follow Up",
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
            select
            name="mode"
            onChange={(e) => setMode(e.target.value)}
            label="Select Mode"
            value={mode}
            variant="outlined"
          >
            {["Physical", "Online"].map((mode, index) => (
              <MenuItem value={mode} key={index}>
                <option label={mode} />
              </MenuItem>
            ))}
          </TextField>
        </Grid>
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
        <Button onClick={handleFollowUp} variant="contained">
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

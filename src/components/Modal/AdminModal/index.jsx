import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
  Slider,
} from "@mui/material";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosPrivate from "../../../api/axiosPrivate";
import { toast } from "react-toastify";

export const AdminModal = ({ open, onClose, data, setFlag, flag }) => {
  const handleClick = async (firmCouncilId) => {
    try {
      const res = await axiosPrivate.delete("/admin/removeFirm", {
        data: { firmCouncilId },
      });
      setFlag(!flag);

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
          ARE YOU SURE?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Firm ID: {data?.firmCouncilId}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Firm Name: {data?.firmName}
        </Typography>
        {/* <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" gutterBottom>
            Appointment ID: {data?.appointmentId}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lawyer ID: {data?.lawyerCouncilId}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lawyer Name: {data?.lawyerDetails.firstName}{" "}
            {data?.lawyerDetails.lastName}
          </Typography>
        </Box>
        <Grid sx={{ paddingBottom: "10px" }}>
          <Slider
            defaultValue={2}
            valueLabelDisplay="auto"
            shiftStep={3}
            step={1}
            marks={marks}
            min={1}
            max={5}
            color="warning"
            onChange={(event) => setStars(event.target.value)}
          />
        </Grid> */}
        <Button
          variant="contained"
          onClick={() => handleClick(data?.firmCouncilId)}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

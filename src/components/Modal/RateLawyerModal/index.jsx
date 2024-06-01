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

export const RateLawyerModal = ({ open, onClose, data, setFlag, flag }) => {
  const [stars, setStars] = useState();

  const marks = [
    {
      value: 1,
      label: "1*",
    },
    {
      value: 2,
      label: "2*",
    },
    {
      value: 3,
      label: "3*",
    },
    {
      value: 4,
      label: "4*",
    },
    {
      value: 5,
      label: "5*",
    },
  ];

  const handleRating = async () => {
    console.log(stars);
    try {
      const res = (
        await axiosPrivate.put("/client/rating", {
          appointmentId: data.appointmentId,
          stars,
        })
      ).data;

      if (!res) throw new Error("Something Went Wrong");

      setFlag(!flag);
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
          Give Rating
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
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
        </Grid>
        <Button variant="contained" onClick={handleRating}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

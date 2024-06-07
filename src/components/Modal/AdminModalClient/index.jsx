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

export const AdminModalClient = ({ open, onClose, data, setFlag, flag }) => {
  const handleClick = async (clientID) => {
    try {
      const res = await axiosPrivate.delete("/admin/removeClient", {
        data: { clientID },
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
          Client ID: {data?.clientID}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Client Name: {data?.clientFirstName + " " + data?.clientLastName}
        </Typography>
        <Button variant="contained" onClick={() => handleClick(data?.clientID)}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

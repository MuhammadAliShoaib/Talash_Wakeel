import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import React from "react";
export const UpdatePassModal = ({
  open,
  onClose,
  newPass,
  handlePassword,
  updatePassword,
}) => {
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
          transform: "translate(-43%, -50%)",
          textAlign: "center",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5">Update Password</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="clientPassword"
            onChange={handlePassword}
            value={newPass}
            label="Enter New Password"
            type="password"
            sx={{ marginY: "20px" }}
          />
        </Grid>
        <Button
          onClick={() => {
            updatePassword();
            onClose();
          }}
          variant="contained"
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
import DropDown from "../../DropDown";
import { lawyerTypes } from "../../../utility/utils";
import { Formik, useFormik } from "formik";
import { createLawyerValidationSchema } from "../../../utility/validation";
import bcrypt from "bcryptjs";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AddLawyerModal = ({ open, onClose }) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const lawyerFormik = useFormik({
    initialValues: {
      councilId: null,
      firstName: "",
      lastName: "",
      email: "",
      type: "Criminal Lawyer",
      password: "",
    },
    validationSchema: createLawyerValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(values.password, salt);

      try {
        const res = await axiosPrivate.post(`/firm/addLawyer`, {
          firmCouncilId: auth.barCouncilId,
          barCouncilId: values.councilId,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: hashedPassword,
          field: values.type,
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
      } catch (error) {
        console.log("Error: ", error);
        if (error.res && error.res.status === 409) {
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
        } else if (error.res && error.res.status === 500) {
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
      onClose();
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-details-modal"
      aria-describedby="user-details-input"
    >
      <Box
        component="form"
        noValidate
        onSubmit={lawyerFormik.handleSubmit}
        sx={{
          position: "absolute",
          width: 400,
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
          Create Lawyer
        </Typography>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            fullWidth
            required
            margin="normal"
            id="firstName"
            name="firstName"
            onChange={lawyerFormik.handleChange}
            value={lawyerFormik.values.firstName}
          />
          {lawyerFormik.errors.firstName && lawyerFormik.touched.firstName ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {lawyerFormik.errors.firstName}
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            id="lastName"
            name="lastName"
            onChange={lawyerFormik.handleChange}
            value={lawyerFormik.values.lastName}
          />
          {lawyerFormik.errors.lastName && lawyerFormik.touched.lastName ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {lawyerFormik.errors.lastName}
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Council Id"
            type="number"
            fullWidth
            margin="normal"
            id="councilId"
            name="councilId"
            onChange={lawyerFormik.handleChange}
            value={lawyerFormik.values.councilId}
          />
          {lawyerFormik.errors.councilId && lawyerFormik.touched.councilId ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {lawyerFormik.errors.councilId}
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            id="email"
            name="email"
            onChange={lawyerFormik.handleChange}
            value={lawyerFormik.values.email}
          />
          {lawyerFormik.errors.email && lawyerFormik.touched.email ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {lawyerFormik.errors.email}
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            fullWidth
            type="password"
            margin="normal"
            id="password"
            name="password"
            onChange={lawyerFormik.handleChange}
            value={lawyerFormik.values.password}
          />
          {lawyerFormik.errors.password && lawyerFormik.touched.password ? (
            <Box component={"span"} sx={{ display: "inline", color: "red" }}>
              {lawyerFormik.errors.password}
            </Box>
          ) : null}
        </Grid>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              label="Lawyer Type"
              fullWidth
              select
              margin="normal"
              id="type"
              name="type"
              onChange={lawyerFormik.handleChange}
              value={lawyerFormik.values.type}
            >
              {lawyerTypes.map((lawyer) => (
                <MenuItem key={lawyer} value={lawyer}>
                  <option label={lawyer} />
                </MenuItem>
              ))}
            </TextField>
            {lawyerFormik.errors.type && lawyerFormik.touched.type ? (
              <Box component={"span"} sx={{ display: "inline", color: "red" }}>
                {lawyerFormik.errors.type}
              </Box>
            ) : null}
          </Grid>
          <Button type="submit" variant="contained">
            Create Lawyer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddLawyerModal;

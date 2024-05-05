import React, { useState } from 'react';
import { Button, Modal, TextField, Box, Typography } from '@mui/material';
import DropDown from '../../DropDown';
import { lawyerTypes } from '../../../utility/utils';
import { Formik, useFormik } from 'formik';
import { createLawyerValidationSchema } from '../../../utility/validation';

const AddLawyerModal = ({ open, onClose }) => {

  const lawyerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      councilId: 0,
      type: "",
      password: "",
    },
    validationSchema: createLawyerValidationSchema,
    onSubmit: async (values) => {
      onClose()
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-details-modal"
      aria-describedby="user-details-input"
      onSubmit={lawyerFormik.handleSubmit}
    >

      <Box
        sx={{
          position: 'absolute',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
          Create Lawyer
        </Typography>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          id="firstName"
          name="firstName"
          onChange={lawyerFormik.handleChange}
          value={lawyerFormik.values.firstName}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          id="lastName"
          name="lastName"
          onChange={lawyerFormik.handleChange}
          value={lawyerFormik.values.lastName}
        />
        <TextField
          label="Council Id"
          type='number'
          fullWidth
          margin="normal"
          id="councilId"
          name="councilId"
          onChange={lawyerFormik.handleChange}
          value={lawyerFormik.values.councilId}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          id="email"
          name="email"
          onChange={lawyerFormik.handleChange}
          value={lawyerFormik.values.email}
        />
        <TextField
          label="Password"
          fullWidth
          type='password'
          margin="normal"
          id="password"
          name="password"
          onChange={lawyerFormik.handleChange}
          value={lawyerFormik.values.password}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '15px' }}>
          <DropDown options={lawyerTypes} />
          <Button variant="contained" type='submit'>
            Create
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddLawyerModal;

import React, { useState } from 'react';
import { Button, Modal, TextField, Box, Typography, Grid } from '@mui/material';
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
      CouncilId: 0,
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
        component="form"
        noValidate
        onSubmit={lawyerFormik.handleSubmit}
      >
        <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
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
          {lawyerFormik.errors.firstName ? <Box component={'span'} sx={{ display: 'inline', color: 'red' }} >{lawyerFormik.errors.firstName}</Box> : null}
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
          {lawyerFormik.errors.lastName ? <Box component={'span'} sx={{ display: 'inline', color: 'red' }} >{lawyerFormik.errors.lastName}</Box> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Council Id"
            type='number'
            fullWidth
            margin="normal"
            id="councilId"
            name="councilId"
            onChange={lawyerFormik.handleChange}
            value={lawyerFormik.values.CouncilId}
          />
          {lawyerFormik.errors.CouncilId ? <Box component={'span'} sx={{ display: 'inline', color: 'red' }} >{lawyerFormik.errors.CouncilId}</Box> : null}
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
          {lawyerFormik.errors.email ? <Box component={'span'} sx={{ display: 'inline', color: 'red' }} >{lawyerFormik.errors.email}</Box> : null}
        </Grid>
        <Grid item xs={12} sm={6}>
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
          {lawyerFormik.errors.password ? <Box component={'span'} sx={{ display: 'inline', color: 'red' }} >{lawyerFormik.errors.password}</Box> : null}
        </Grid>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '15px' }}>
          <Grid item xs={12} sm={6} sx={{display:'flex',flexDirection : 'column'}}>
            <DropDown options={lawyerTypes} value={lawyerFormik.values.type} setType={lawyerFormik.handleChange} />
            {lawyerFormik.errors.type ? <Box component={'span'} sx={{ display: 'inline', color: 'red' }} >{lawyerFormik.errors.type}</Box> : null}
          </Grid>
          <Button variant="contained" type='submit'>
            Create
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddLawyerModal;

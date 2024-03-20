import React, { useState } from 'react';
import { Button, Modal, TextField, Box, Typography } from '@mui/material';

const AddLawyerModal = ({ open, onClose, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [field, setField] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    onSave({ firstName,lastName,field, email, password });
    setName('');
    setEmail('');
    setPhoneNumber('');
  };

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
      >
        <Typography variant="h5" gutterBottom sx={{color : 'black'}}>
          Create Lawyer
        </Typography>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Field"
          value={field}
          onChange={(e) => setField(e.target.value)}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          type='password'
          margin="normal"
        />
        <Button variant="contained" onClick={handleSave} sx={{marginTop : '15px'}}>
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default AddLawyerModal;

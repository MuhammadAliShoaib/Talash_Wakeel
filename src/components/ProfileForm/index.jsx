import * as React from 'react';
import { Box, Grid, IconButton, TextField, MenuItem, Button, styled } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import Image from "../../assets/profile.jpg";
import { cities } from '../../utility/data';

const ProfilePicture = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function ProfileForm() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImageUrl("");
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'TalashWakeel'); 
      formData.append('cloud_name', 'dg8syp8h6'); 

      axios.post('https://api.cloudinary.com/v1_1/dg8syp8h6/image/upload', formData)
        .then(response => {
          setImageUrl(response.data.secure_url);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProfilePicture>
            <label htmlFor="profile-picture" style={{ position: 'relative' }}>
              <div style={{ borderRadius: '50%', width: '150px', height: '150px', overflow: 'hidden' }}>
                <img src={imageUrl.length !== 0 ? imageUrl : Image} width="100%" height="100%" alt="Profile" />
              </div>
              <input
                accept="image/*"
                id="profile-picture"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <IconButton component="span" sx={{ backgroundColor: '#EEEEEE', position: 'absolute', bottom: -10, right: 0 }}>
                <PhotoCamera />
              </IconButton>
            </label>
          </ProfilePicture>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Second Name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Contact Number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Select City"
            variant="outlined"
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
          />
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleUpload}
      >
        Update
      </Button>
    </Box>
  );
}

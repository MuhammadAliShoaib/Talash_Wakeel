import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Image from "../../assets/profile.jpg"
import { Button } from '@mui/material';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const ProfilePicture = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export default function ProfileForm() {

    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    };


    return (
        <Grid container spacing={3}>
            <FormGrid item xs={12}>
                <ProfilePicture>
                    <label htmlFor="profile-picture" style={{ position: 'relative' }}>
                        <div style={{ borderRadius: '50%', width: '150px', height: '150px', backgroundColor: 'red', overflow: 'hidden' }}>
                            <img src={Image} width={'100%'} height={'100%'} />
                        </div>
                        <input
                            accept="image/*"
                            id="profile-picture"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <IconButton component="span" sx={{ backgroundColor: '#EEEEEE', position: 'absolute', bottom: -10, right: 0, }}>
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </ProfilePicture>
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="first-name" required>
                    First name
                </FormLabel>
                <OutlinedInput
                    id="first-name"
                    name="first-name"
                    type="name"
                    placeholder="Enter First Name"
                    autoComplete="first name"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="last-name" required>
                    Last name
                </FormLabel>
                <OutlinedInput
                    id="last-name"
                    name="last-name"
                    type="last-name"
                    placeholder="Enter Last Name"
                    autoComplete="last name"
                    required
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="city" required>
                    City
                </FormLabel>
                <OutlinedInput
                    id="city"
                    name="city"
                    type="city"
                    placeholder="Enter City"
                    autoComplete="City"
                    required
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="zip" required>
                    Phone Number
                </FormLabel>
                <OutlinedInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="number"
                    placeholder="+92..."
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="country" required>
                    Password
                </FormLabel>
                <OutlinedInput
                    id="country"
                    name="password"
                    placeholder="Enter Password"
                    type='password'
                />
            </FormGrid>
        </Grid>
    );
}

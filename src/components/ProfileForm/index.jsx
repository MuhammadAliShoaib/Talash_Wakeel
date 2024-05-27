import * as React from "react";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  MenuItem,
  Button,
  styled,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import Image from "../../assets/profile.jpg";
import { cities } from "../../utility/data";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const ProfilePicture = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default function ProfileForm() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [profileUrl, setProfileUrl] = React.useState("");
  const [profileData, setProfileData] = React.useState({});

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setProfileUrl("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(profileData.clientPassword);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "TalashWakeel");
      formData.append("cloud_name", "dg8syp8h6");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/dg8syp8h6/image/upload",
          formData
        )
        .then((response) => {
          const updatedProfileData = {
            ...profileData,
            profileUrl: response.data.secure_url,
          };
          submitProfileData(updatedProfileData);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      submitProfileData(profileData);
    }
  };

  const submitProfileData = (data) => {
    axiosPrivate
      .put("/client/updateProfile", data)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const getClientDetails = async () => {
    try {
      const response = await axiosPrivate.get("/client/getDetails", {
        params: { clientID: auth.clientID },
      });
      setProfileData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  React.useEffect(() => {
    getClientDetails();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} mb={"15px"}>
          <ProfilePicture>
            <label htmlFor="profile-picture" style={{ position: "relative" }}>
              <div
                style={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={
                    profileData.profileUrl === ""
                      ? profileUrl.length !== 0
                        ? profileUrl
                        : Image
                      : profileData.profileUrl
                  }
                  width="100%"
                  height="100%"
                  alt="Profile"
                />
              </div>
              <input
                accept="image/*"
                id="profile-picture"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <IconButton
                component="span"
                sx={{
                  backgroundColor: "#EEEEEE",
                  position: "absolute",
                  bottom: -10,
                  right: 0,
                }}
              >
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
            name="clientFirstName"
            value={profileData.clientFirstName}
            onChange={handleChange}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            name="clientLastName"
            value={profileData.clientLastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Contact Number"
            name="clientPhoneNumber"
            value={profileData.clientPhoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Select City"
            name="clientCity"
            value={profileData.clientCity}
            onChange={handleChange}
            variant="outlined"
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="clientPassword"
            value={profileData.clientPassword}
            onChange={handleChange}
          />
        </Grid> */}
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

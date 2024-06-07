import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import Image from "../../../assets/profile.jpg";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const ProfilePicture = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const AddDocumentModal = ({ open, onClose }) => {

  const [profileUrl, setProfileUrl] = React.useState("");
  const [title, setTitle] = useState("")

  const handleFollowUp = () => { };

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
          const documentData = {
            ...title,
            documentUrl: response.data.secure_url,
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
        toast.success(`${response.data.message}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
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
          Add Document
        </Typography>
        <Grid item xs={12} sm={6} sx={{ marginBottom: '15px' }}>
          <TextField
            sx={{ width: '63%' }}
            label="Title"
            fullWidth
            margin="normal"
            id="title"
            name="title"
          // onChange={setTitle}
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ marginBottom: '15px' }}>
          <ProfilePicture>
            <label htmlFor="profile-picture" style={{ position: "relative" }}>
              <div
                style={{
                  // borderRadius: "50%",
                  width: "350px",
                  height: "200px",
                  overflow: "hidden",
                  backgroundColor: '#666666',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={profileUrl || Image}
                  width="100px"
                  height="100px"
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
              {/* <IconButton
                component="span"
                sx={{
                  backgroundColor: "#EEEEEE",
                  position: "absolute",
                  bottom: -10,
                  right: 0,
                }}
              >
                <PhotoCamera />
              </IconButton> */}
            </label>
          </ProfilePicture>
        </Grid>
        <Button onClick={handleFollowUp} variant="contained">
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

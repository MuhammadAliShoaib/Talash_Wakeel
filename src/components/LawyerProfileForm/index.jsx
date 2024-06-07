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
import { UpdatePassModal } from "../Modal/UpdatePassModal";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { lawyerTypes } from "../../utility/utils";

const ProfilePicture = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default function LawyerProfileForm() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [profileUrl, setProfileUrl] = React.useState("");
  const [profileData, setProfileData] = React.useState({});
  const [newPass, setNewPass] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

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
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setNewPass(e.target.value);
  };

  const updatePassword = async () => {
    try {
      if (newPass.length < 5) {
        toast.error(`Password should be at least 5 characters`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const newHash = bcrypt.hashSync(newPass, salt);
      const res = (
        await axiosPrivate.put("/lawyer/updatePassword", {
          Id: auth.lawyerCouncilId,
          newHash,
        })
      ).data;
      if (!res) {
        throw new Error("Something Went Wrong Try Again");
      }

      toast.success(`${res.message}`, {
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
      .put("/lawyer/updateProfile", data)
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

  const getLawyerDetails = async () => {
    try {
      const response = await axiosPrivate.get("/lawyer/getDetails", {
        params: { lawyerCouncilId: auth.lawyerCouncilId },
      });
      setProfileData(response.data);
      setProfileUrl(response.data.profileUrl);
      console.log(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  React.useEffect(() => {
    getLawyerDetails();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <UpdatePassModal
        password={newPass}
        handlePassword={handlePassword}
        updatePassword={updatePassword}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
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
                  src={profileUrl || Image}
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
            value={profileData.firstName}
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
            value={profileData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Field"
            fullWidth
            select
            margin="normal"
            id="field"
            name="field"
            onChange={handleChange}
            value={profileData.field}
          >
            {lawyerTypes.map((lawyer) => (
              <MenuItem key={lawyer} value={lawyer}>
                <option label={lawyer} />
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleUpload}
      >
        Update Profile
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => setIsOpen(true)}
      >
        Update Password
      </Button>
    </Box>
  );
}

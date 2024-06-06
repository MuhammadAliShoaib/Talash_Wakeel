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

export const AddDocumentModal = ({ open, onClose, }) => {

    const [type, setType] = useState("");
    const [profileUrl, setProfileUrl] = React.useState("");


    const handleFollowUp = () => {

    }

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
                <Grid sx={{ paddingBottom: "10px" }}>
                    <TextField
                        required
                        sx={{
                            width: "62%",
                        }}
                        select
                        name="type"
                        onChange={(e) => setType(e.target.value)}
                        label="Select Type"
                        value={type}
                        variant="outlined"
                    >
                        {["CNIC", "Supportive Document"].map((mode, index) => (
                            <MenuItem value={mode} key={index}>
                                <option label={mode} />
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
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
                <Button onClick={handleFollowUp} variant="contained">
                    Confirm
                </Button>
            </Box>
        </Modal >
    );
};

import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const BookLawyerModal = ({ open, onClose, data }) => {

    const [date, setDate] = useState()

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
                // onSubmit={lawyerFormik.handleSubmit}
                sx={{
                    position: "absolute",
                    width: "90%", // Adjusted width to make it responsive
                    maxWidth: "400px", // Added maxWidth for better responsiveness
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
                    Book Lawyer
                </Typography>
                <Box sx={{ marginBottom: 2 }}> {/* Added margin bottom for spacing */}
                    <Typography variant="body1" gutterBottom>
                        Name: {data.firstName} {data.lastName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Email: {data.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Field: {data.field}
                    </Typography>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Appointment date"
                        format="DD/MM/YYYY"
                        onChange={(date) =>
                            setDate(date?.toLocaleString())
                        }
                        value={date}
                        disablePast
                        sx={{ width: "80%", marginBottom: 2 }}
                    />
                </LocalizationProvider>
                <Button type="submit" variant="contained">
                    Confirm Booking
                </Button>
            </Box>
        </Modal >
    )
}

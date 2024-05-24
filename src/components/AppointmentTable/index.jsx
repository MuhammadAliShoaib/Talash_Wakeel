import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#141925",
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AppointmentTable({ data, setFlag, flag }) {
  const axiosPrivate = useAxiosPrivate();

  const updateStatus = async (appointmentId) => {
    try {
      const res = await axiosPrivate.put(`/lawyer/updateStatus`, {
        appointmentId,
        status: "Done",
      });
      if (!res) {
        throw new Error("Error Occured, Update Failed");
      }
      setFlag(!flag);
      toast.success(`${res.data.message}`, {
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Client ID</StyledTableCell>
              <StyledTableCell>Client Name</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Mode</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((booking, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{booking.clientID}</StyledTableCell>
                <StyledTableCell>{booking.clientName}</StyledTableCell>
                <StyledTableCell>
                  {new Date(booking.bookingDate).toLocaleDateString("en-GB")}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(booking.bookingDate).toLocaleDateString("en-GB")}
                </StyledTableCell>
                <StyledTableCell>
                  Online
                </StyledTableCell>
                <StyledTableCell>
                  {booking.status === "Pending" ? (
                    <Button
                      onClick={() => {
                        updateStatus(booking.appointmentId);
                      }}
                      variant="contained"
                    >
                      {booking.status}
                    </Button>
                  ) : (
                    booking.status
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

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

export default function AppointmentTable({
  data,
  requestTable,
  updateStatus,
  onReschedule,
}) {
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
              {requestTable ? (
                <>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((booking, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{booking.clientID}</StyledTableCell>
                <StyledTableCell>
                  {booking.clientDetails.clientFirstName}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(booking.bookingDate).toLocaleDateString("en-GB")}
                </StyledTableCell>
                <StyledTableCell>{booking.bookingTime}</StyledTableCell>
                <StyledTableCell>Online</StyledTableCell>
                <StyledTableCell>{booking.status}</StyledTableCell>
                {requestTable ? (
                  <>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        onClick={() => updateStatus(booking.appointmentId)}
                      >
                        Approve
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        onClick={() => onReschedule(booking)}
                      >
                        Reschedule
                      </Button>
                    </StyledTableCell>
                  </>
                ) : null}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
